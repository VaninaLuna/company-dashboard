import Image from "next/image";
import { CompanyInformationProps } from "./CompanyInformation.types";
import { User } from "lucide-react";
import CompanyForm from "../CompanyForm/CompanyForm";
import { NewContact } from "../NewContact";
import { ListContacts } from "../ListContacts/ListContacts";

export default function CompanyInformation(props: CompanyInformationProps) {
    const { company } = props


    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 gap-y-4">
            <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4">

                <div>
                    {company.profile ? (
                        <Image src={company.profile} alt="Company Img" width={50} height={50} className="rounded-lg mn-3" />
                    ) : (
                        <div className="w-[50px] h-[50px] bg-gray-200 rounded-lg flex items-center justify-center mn-3">
                            <span>No Image</span>
                        </div>
                    )}
                    <CompanyForm company={company} />
                </div>
            </div>
            <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4 h-min">
                <div className="flex items-center justify-between gap-x-2">
                    <div className="flex items-center gap-x-2">
                        <User className="w-5 h-5" />
                        Contacts
                    </div>
                    <div>
                        <NewContact />
                    </div>
                </div>
                <ListContacts company={company} />
            </div>
        </div>
    )
}
