import { LayoutDashboard, Map, User } from "lucide-react";
import Link from "next/link";

const Sidebar = ({active}:{active:string}) => {
    return (
        <div className="w-full h-full flex flex-col p-4 bg-zinc-800 rounded-md">
            <h2 className="text-2xl font-bold">
                Nomic
            </h2>
            <h4 className="text-sm">
                Discord Dashboard
            </h4>

            <div className="w-full flex flex-col gap-y-2">
                <div className="rounded-full w-20 h-20 bg-zinc-400 mx-auto mt-20 flex justify-center items-center">
                    <User height={40} width={40}/>
                </div>
                <span className="text-sm text-center">Username</span>
                <button disabled className="bg-zinc-800 border border-zinc-600 rounded-lg px-2 mx-auto text-xs disabled:opacity-80">Settings</button>
            </div>
            <div className="flex flex-col gap-y-6 mt-14">
                <Link href={"/"}>
                    <button className={`w-2/3 mx-auto rounded-md p-4 h-12 flex flex-row items-center text-zinc-200 ${active === "home" ? "bg-zinc-700/40" : ""} gap-x-1`}>
                        <LayoutDashboard/>
                        <span className="text-lg font-semibold">Dashboard</span>
                    </button>
                </Link>
                <Link href="/atlas">
                    <button className={`w-2/3 mx-auto rounded-md p-4 h-12 flex flex-row items-center text-zinc-200 ${active === "atlas" ? "bg-zinc-700/40" : ""} gap-x-1`}>
                        <Map/>
                        <span className="text-lg font-semibold">Atlas</span>
                    </button>
                </Link>
                
            </div>
        </div>
    )
}

export default Sidebar;