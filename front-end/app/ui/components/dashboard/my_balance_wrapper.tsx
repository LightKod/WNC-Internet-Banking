import { BankAccount, BASE_URL } from "@/app/lib/definitions/definition"
import { getAccessToken } from "@/app/lib/utilities/server_utilities"
import MyBalance from "./my_balance"
import { delay } from "@/app/lib/utilities/fake_delay"

export default async function MyBalanceWrapper() {
    let bankAccounts: BankAccount[] = []

    try {
        const response = await fetch(`${BASE_URL}/account/user`, {
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
        bankAccounts = data.data.accounts.map((account:any) => ({
            accountType: account.account_type,
            accountNumber: account.account_number,
            balance: account.balance
        }))
    } catch(error) {
        throw error
    }

    return (
        <MyBalance bankAccounts={bankAccounts}/>
    )
}