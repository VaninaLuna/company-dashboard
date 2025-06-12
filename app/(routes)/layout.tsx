import { Navbar } from "@/components/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Layout({ children }: { children: React.ReactElement }) {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[#fafbfc] dark:bg-secondary">
            <div className="hidden xl:block xl:fixed xl:w-80 xl:h-screen border-r bg-white dark:bg-secondary">
                <Sidebar />
            </div>
            <div className="flex flex-col flex-1 w-full xl:ml-80 h-full overflow-y-auto">
                <Navbar />
                <main className="flex-grow p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
