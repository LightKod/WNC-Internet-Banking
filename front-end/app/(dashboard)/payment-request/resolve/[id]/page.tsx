import { BASE_URL, Contact, DetailedPaymentRequest } from "@/app/lib/definitions/definition"
import { InternalTransferFormValues } from "@/app/lib/schemas/schemas"
import { getAccessToken } from "@/app/lib/utilities/server_utilities"
import { splitDatetimeString } from "@/app/lib/utilities/utilities"
import ResolvePaymentRequestContent from "@/app/ui/components/payment_request/resolve_payment_request_content"
import { notFound } from "next/navigation"

export default async function Page({
    params
} : {
    params: { id: string }
}) {
    const id = params.id

    let paymentRequest: DetailedPaymentRequest

    try {
        const response = await fetch(`${BASE_URL}/debt/${id}`, {
            cache: 'no-store',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-type': 'application/json'
            }
        })

        if(response.status === 401) {
            throw new Error("401")
        }

        if(response.status === 400) {
            notFound()
        }

        if(!response.ok) {
            throw new Error("Something went wrong")
        }

        const data = await response.json()
        // console.log(data)
        const creditorAccount = data.data.creditor_account
        const accountResponse = await fetch(`${BASE_URL}/account/user/${creditorAccount}`, {
            cache: 'no-store',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-type': 'application/json'
            }
        })

        if(accountResponse.status === 404) {
            throw new Error("401")
        }
    
        if(!accountResponse.ok) {
            throw new Error("Something went wrong")
        }

        const accountData = await accountResponse.json()
        paymentRequest = {
            id: data.data.id,
            creditorAccountNumber: creditorAccount,
            debtorAccountNumber: data.data.debtor_account,
            creditorName: accountData.data.username,
            createdDate: splitDatetimeString(data.data.created_at),
            amount: data.data.amount,
            description: data.data.description,
            status: data.data.status,
            cancelNote: data.data.cancel_note,
        }
    } catch(error) {
        throw error
    }

    console.log(paymentRequest)

    return (
        <div className="flex flex-col gap-y-4">
            <span className="text-2xl font-bold">Resolve a payment request</span>
            <ResolvePaymentRequestContent id={id} paymentRequest={paymentRequest}/>
        </div>
    )
}