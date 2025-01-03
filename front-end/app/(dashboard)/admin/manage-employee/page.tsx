import { revalidateManageEmployee } from "@/app/lib/actions/revalidation";
import ManageEmployeePageContent from "@/app/ui/components/manage_employee/manage_employee_page_content";
import { ArrowPathIcon } from "@heroicons/react/16/solid";

export default function Page({
    searchParams 
}: {
    searchParams?: { 
        query?:string;
        page?:string 
}}) {
    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">Manage your payment requests</span>
                <form action={revalidateManageEmployee}>
                    <button className="flex items-center justify-center gap-2 rounded-md px-3 py-2 bg-blue-600 text-blue-50 text-sm font-medium hover:bg-blue-700 transition-colors duration-300">
                        <ArrowPathIcon className="w-4"/>
                        <p className="hidden md:block">Refresh</p>
                    </button>
                </form>
            </div>
            <ManageEmployeePageContent searchParams={searchParams}/>
        </div>
    )
}