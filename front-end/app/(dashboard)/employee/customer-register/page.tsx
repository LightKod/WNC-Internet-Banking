import CustomerRegisterPageContent from "@/app/ui/components/customer_register/customer_register_page_content";

export default function Page() {
    return (
        <div className="flex flex-col gap-y-4">
            <span className="text-2xl font-bold">Register a customer account</span>
            <CustomerRegisterPageContent/>
        </div>
    )
}