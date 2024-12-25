import AssignEmployee from "./assign_employee";
import EmployeeList from "./employee_list";
import Pagination from "./pagination";
import SearchBar from "./search_bar";

export default function ManageEmployeePageContent() {
    return (
        <div className="flex flex-col p-4 gap-y-4 bg-white rounded-md shadow-sm border-2 border-slate-100 md:gap-y-8 md:p-8">
            <div className="flex justify-between items-center gap-4">
                <AssignEmployee/>
                <SearchBar placeholder="Search for employees"/>
            </div>
            <EmployeeList/>
            <Pagination totalPages={3}/>
        </div>
    )
}