import CreatePaymentRequestContent from "@/app/ui/components/payment_request/create_payment_request_content";

export default function Page() {
    return (
        <div className="flex flex-col gap-y-4">
            <span className="text-2xl font-bold">Create a payment request</span>
            <CreatePaymentRequestContent/>
        </div>
    )
}