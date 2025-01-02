import { BASE_URL, Employee } from "@/app/lib/definitions/definition";
import AssignEmployee from "./assign_employee";
import EmployeeList from "./employee_list";
import Pagination from "./pagination";
import SearchBar from "./search_bar";
import { getAccessToken } from "@/app/lib/utilities/server_utilities";

export default async function ManageEmployeePageContent({
    searchParams 
}: {
    searchParams?: { 
        query?:string;
        page?:string 
}}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    let employees: Employee[] = []
    let maxPage

    try {
        const response = await fetch(`${BASE_URL}/user?page=${currentPage}&search=${query}`, {
            cache: 'no-store',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-type': 'application/json'
            }
        })

        if(!response.ok) {
            throw new Error("Something went wrong")
        }

        const data = await response.json()
        employees = data.data.data.map((employee:any) => ({
            id: employee.id,
            name: employee.name,
            email: employee.email,
            status: employee.status
        }))
        maxPage = Math.ceil(data.data.total / data.data.limit)
    } catch(error) {
        throw error
    }

    return (
        <div className="flex flex-col p-4 gap-y-4 bg-white rounded-md shadow-sm border-2 border-slate-100 md:gap-y-8 md:p-8">
            <div className="flex justify-between items-center gap-4">
                <AssignEmployee/>
                <SearchBar placeholder="Search for employees"/>
            </div>
            <EmployeeList employees={employees}/>
            <Pagination totalPages={maxPage}/>
        </div>
    )
}