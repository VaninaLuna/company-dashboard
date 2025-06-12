import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Header from "./components/Header/Header";
import CompanyInformation from "./components/CompanyInformation/CompanyInformation";
import FooterCompany from "./components/FooterCompany/FooterCompany";

interface PageProps {
    params: {
        companyId: string
    }
}


export default async function Page({ params }: PageProps) {

    const { userId } = await auth();
    if (!userId) {
        return redirect("/")
    }


    const company = await db.company.findUnique({
        where: {
            id: params.companyId,
            userId
        }
    })

    if (!company) {
        return redirect("/")
    }

    console.log(company)

    return (
        <div>
            <Header />
            <CompanyInformation company={company} />
            <FooterCompany companyId={company.id} />
        </div>
    )
}
