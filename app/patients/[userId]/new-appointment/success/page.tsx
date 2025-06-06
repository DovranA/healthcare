import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";

const RequestSuccess = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);
  if (!appointment) {
    return null;
  }
  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment?.primaryPhysician
  );

  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <div className="flex gap-2 items-center ">
            <Image
              src="/assets/images/onboarding-img.webp"
              height={1000}
              width={1000}
              alt="patient"
              className=" h-10 w-fit"
            />
            Oguz Saglyk
          </div>
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Siziň <span className="text-blue-500">duýduryş sargydyňyz</span>{" "}
            üstünlikli tabşyryldy!
          </h2>
          <p>Biz gysga wagtda tassyklamak üçin habarlaşarys.</p>
        </section>

        <section className="request-details">
          <p>Talap edilen duýduryş maglumatlary: </p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            Täze Duýduryş
          </Link>
        </Button>
        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/`}>Baş Sahypa</Link>
        </Button>

        <p className="copyright">© 2025 Oguz Saglyk</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
