import { revalidatePaymentRequest } from "@/app/lib/actions/revalidation"
import { BASE_URL, PaymentRequest } from "@/app/lib/definitions/definition"
import { getAccessToken } from "@/app/lib/utilities/server_utilities"
import { splitDatetimeString } from "@/app/lib/utilities/utilities"
import PaymentRequestPageContent from "@/app/ui/components/payment_request/payment_request_page_content"
import { ArrowPathIcon } from "@heroicons/react/16/solid"

export default async function Page() {
    let selfPaymentRequests: PaymentRequest[] = []
    let otherPaymentRequests: PaymentRequest[] = []

    try {
        const response = await fetch(`${BASE_URL}/debt/user/creditor`, {
            cache: 'no-store',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-type': 'application/json'
            }
        })

        if(response.status === 401) {
            throw new Error("401")
        }

        if(!response.ok) {
            throw new Error("Something went wrong")
        }

        const data = await response.json()
        // console.log(data)
        selfPaymentRequests = await Promise.all(
            data.data.map(async (paymentRequest:any) => {
                const debtorAccount = paymentRequest.debtor_account
                const accountResponse = await fetch(`${BASE_URL}/account/user/${debtorAccount}`, {
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
                return {
                    id: paymentRequest.id,
                    name: accountData.data.username,
                    accountNumber: accountData.data.account_number,
                    createdDate: splitDatetimeString(paymentRequest.created_at),
                    amount: paymentRequest.amount,
                    status: paymentRequest.status
                }
            })
        )
    } catch(error) {
        throw error
    }

    try {
        const response = await fetch(`${BASE_URL}/debt/user/debtor`, {
            cache: 'no-store',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-type': 'application/json'
            }
        })

        if(response.status === 401) {
            throw new Error("401")
        }

        if(!response.ok) {
            throw new Error("Something went wrong")
        }

        const data = await response.json()
        // console.log(data)
        otherPaymentRequests = await Promise.all(
            data.data.map(async (paymentRequest:any) => {
                const creditorAccount = paymentRequest.creditor_account
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
                return {
                    id: paymentRequest.id,
                    name: accountData.data.username,
                    accountNumber: accountData.data.account_number,
                    createdDate: splitDatetimeString(paymentRequest.created_at),
                    amount: paymentRequest.amount,
                    status: paymentRequest.status
                }
            })
        )
    } catch(error) {
        throw error
    }

    // console.log(selfPaymentRequests)

    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">Manage your payment requests</span>
                <form action={revalidatePaymentRequest}>
                    <button className="flex items-center justify-center gap-2 rounded-md px-3 py-2 bg-blue-600 text-blue-50 text-sm font-medium hover:bg-blue-700 transition-colors duration-300">
                        <ArrowPathIcon className="w-4"/>
                        <p className="hidden md:block">Refresh</p>
                    </button>
                </form>
            </div>
            <PaymentRequestPageContent selfPaymentRequests={selfPaymentRequests} otherPaymentRequests={otherPaymentRequests}/>
        </div>
    )
}