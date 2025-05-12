import Image from "next/image";
import Link from "next/link";

import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();
  if (!appointments) {
    return null;
  }
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14 text-black">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
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

        <p className="text-16-semibold">Admin Sahypasy</p>
      </header>

      <main className="admin-main">
        {/* <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section> */}

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Bellenen duşuşyklar"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Garaşylýan duşuşyklar"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Ýatyrylan duşuşyklar"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default AdminPage;
