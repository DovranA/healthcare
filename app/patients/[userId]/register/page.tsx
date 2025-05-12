import Image from "next/image";

import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import { SearchParamProps } from "@/types";
// import { getPatient, getUser } from "@/lib/actions/patient.actions";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  // const patient = await getPatient(userId);

  // if (patient) redirect(`/patients/${userId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
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

          {user && <RegisterForm user={user} />}

          <p className="copyright py-12">© 2025 Oguz Saglyk</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.webp"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
