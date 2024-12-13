import PaymentRequestPageContent from "@/app/ui/components/payment_request/payment_request_page_content"

export default function Page() {
    return (
        <div className="flex flex-col gap-y-4">
            <span className="text-2xl font-bold">Manage your payment requests</span>
            <PaymentRequestPageContent/>
        </div>
    )
}