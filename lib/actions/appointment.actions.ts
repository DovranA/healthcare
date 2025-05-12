"use server";

import { Appointment } from "@prisma/client";
import prisma from "../prisma.config";

import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";

//  CREATE APPOINTMENT
export const createAppointment = async (appointment: Appointment) => {
  try {
    const newAppointment = await prisma.appointment.create({
      data: appointment,
    });

    revalidatePath("/admin");
    return newAppointment;
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
  }
};

//  GET RECENT APPOINTMENTS
export const getRecentAppointmentList = async () => {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: "desc" },
      include: { patient: true },
    });

    // const scheduledAppointments = appointments.filter(
    //   (appointment) => appointment.status === "scheduled"
    // );

    // const pendingAppointments = appointments.filter(
    //   (appointment) => appointment.status === "pending"
    // );

    // const cancelledAppointments = appointments.filter(
    //   (appointment) => appointment.status === "cancelled"
    // );

    // const data = {
    //   totalCount: appointments.length,
    //   scheduledCount: scheduledAppointments.length,
    //   pendingCount: pendingAppointments.length,
    //   cancelledCount: cancelledAppointments.length,
    //   documents: appointments,
    // };

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = appointments.reduce((acc, appointment) => {
      switch (appointment.status) {
        case "meýilleşdirilen":
          acc.scheduledCount++;
          break;
        case "garaşylýar":
          acc.pendingCount++;
          break;
        case "ýatyrylan":
          acc.cancelledCount++;
          break;
      }
      return acc;
    }, initialCounts);

    const data = {
      totalCount: appointments.length,
      ...counts,
      documents: appointments,
    };

    return data;
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent appointments:",
      error
    );
  }
};

// //  SEND SMS NOTIFICATION
// export const sendSMSNotification = async (userId: string, content: string) => {
//   try {
//     // https://appwrite.io/docs/references/1.5.x/server-nodejs/messaging#createSms
//     const message = await messaging.createSms(
//       ID.unique(),
//       content,
//       [],
//       [userId]
//     );
//     return parseStringify(message);
//   } catch (error) {
//     console.error("An error occurred while sending sms:", error);
//   }
// };

// //  UPDATE APPOINTMENT
export const updateAppointment = async ({
  appointmentId,
  appointment,
}: any) => {
  try {
    const updatedAppointment = await prisma.appointment.update({
      data: { updatedAt: new Date(), ...appointment },
      where: { id: appointmentId },
    });

    if (!updatedAppointment) throw Error;
    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("An error occurred while scheduling an appointment:", error);
  }
};

// // GET APPOINTMENT
export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    return appointment;
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing patient:",
      error
    );
  }
};
