"use client";

import "react-datepicker/dist/react-datepicker.css";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Appointment } from "@prisma/client";

import { getAppointmentSchema } from "@/lib/validation";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";

import { SelectItem } from "@/components/ui/select";
import { Doctors } from "@/constants";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Form } from "../ui/form";

export const AppointmentForm = ({
  userId,
  patientId,
  type = "create",
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "create" | "schedule" | "cancel";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : "",
      schedule: appointment
        ? new Date(appointment?.schedule!)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "meýilleşdirilen";
        break;
      case "cancel":
        status = "ýatyrylan";
        break;
      default:
        status = "garaşylýar";
    }

    try {
      if (type === "create" && patientId) {
        const appointment = {
          userId,
          patientId: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason ?? null,
          status: status,
          note: values.note ?? null,
        } as Appointment;
        const newAppointment = await createAppointment(appointment);
        if (newAppointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          appointmentId: appointment?.id,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status: status,
            cancellationReason: values.cancellationReason ?? null,
          },
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate);
        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Bellenmäni ýatyrmak";
      break;
    case "schedule":
      buttonLabel = "Bellenmäni meýilleşdirmek";
      break;
    default:
      buttonLabel = "Bellenmäni tabşyrmak";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">Täze Bellenme</h1>
          </section>
        )}

        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Lukman"
              placeholder="Lukman saýlaň"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem
                  className="text-white"
                  key={doctor.name + i}
                  value={doctor.name}
                >
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Garaşylýan bellenme senesi"
              showTimeSelect
              dateFormat="dd/MM/yyyy  -  h:mm aa"
            />

            <div
              className={`flex flex-col gap-6  ${type === "create" && "xl:flex-row"}`}
            >
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Bellenmäniň sebäbi"
                placeholder="Ýyllyk aýlyk barlag"
                disabled={type === "schedule"}
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Teswirler/bellikler"
                placeholder="Mümkin bolsa, günortan bellenmelerini makul bilýärin"
                disabled={type === "schedule"}
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Ýatyrmagyň sebäbi"
            placeholder="Gyssagly ýygnak ýüze çykdy"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};
