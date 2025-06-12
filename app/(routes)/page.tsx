"use client";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { CardSumary } from "./components/CardSumary";
import { BookOpenCheck, UserRound, Waypoints } from "lucide-react";
import LastCustomers from "./components/LastCostumers/LastCustomers";
import { SalesDistributor } from "./components/SalesDistributor";
import TotalSuscribers from "./components/TotalSuscribers/TotalSuscribers";
import ListIntegrations from "./components/ListIntegrations/ListIntegrations";

const dataCardsSumary = [
  {
    icon: UserRound,
    total: "1000",
    average: 15,
    title: "Compañias Creadas",
    tooltiptext: "Total de compañias creadas en la plataforma"

  },
  {
    icon: Waypoints,
    total: "86.5",
    average: 80,
    title: "Total de Puntos de Interés",
    tooltiptext: "Total de puntos de interés registrados en la plataforma"

  },
  {
    icon: BookOpenCheck,
    total: "150",
    average: 50,
    title: "Total de Rutas",
    tooltiptext: "Total de rutas creadas en la plataforma"

  }];
export default function Home() {
  return (
    <>
      <SignedIn>
        {/* <div style={{ padding: '20px' }}>

          <UserButton />
          <p>Bienvenida, estás logueada</p>
        </div> */}
        <div>
          <h1 className="text-2xl mb-4">Dashboard</h1>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20">
          {dataCardsSumary.map(({ icon, total, average, title, tooltiptext }, index) => (
            <CardSumary
              key={index}
              icon={icon}
              total={total}
              average={average}
              title={title}
              tooltiptext={tooltiptext}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 md:gap-x-10 mt-12">
          <LastCustomers />
          <SalesDistributor />
        </div>
        <div className="flex flex-col xl:flex-row gap-y-4 xl:gap-y-0 xl:gap-x-6 mt-12 md:mb-10 justify-center items-stretch">
          <TotalSuscribers />
          <ListIntegrations />

        </div>
      </SignedIn>

      <SignedOut>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // para que tome toda la altura y centre verticalmente
        }}>
          <SignIn />
        </div>
      </SignedOut>
    </>
  );
}
