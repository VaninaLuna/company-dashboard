"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";



export default function Logo() {
    const router = useRouter();
    return (
        <div className="min-h-20 flex items-center px-6 border-b cursor-pointer gap-2"
            onClick={() => router.push("/")}>
            <Image
                src="/logoipsum-370.svg" alt="Logo" width={20} height={20} priority />
            <h1 className="font-bold text-xl">Vani ♥ Manager</h1>

        </div>
    )
}
