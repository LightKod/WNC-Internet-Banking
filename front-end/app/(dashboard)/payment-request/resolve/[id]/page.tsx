import { Contact } from "@/app/lib/definitions/definition"
import { InternalTransferFormValues } from "@/app/lib/schemas/schemas"
import ResolvePaymentRequestContent from "@/app/ui/components/payment_request/resolve_payment_request_content"
import { notFound } from "next/navigation"

export default function Page({
    params
} : {
    params: { id: string }
}) {
    const id = params.id

    const paymentRequest: InternalTransferFormValues = {
        senderAccountNumber: "111122223333",
        receiverAccountNumber: "999988887777",
        amount: 120000,
        transferNote: "This is a note",
        isSelfFeePayment: "true"
    }

    const receiverBankAccount: Contact = {
        name: "Jr. MaBoll",
        bankName: "",
        accountNumber: "999988887777"
    }

    return (
        <div className="flex flex-col gap-y-4">
            <span className="text-2xl font-bold">Resolve a payment request</span>
            <ResolvePaymentRequestContent id={id} paymentRequest={paymentRequest} receiverBankAccount={receiverBankAccount}/>
        </div>
    )
}