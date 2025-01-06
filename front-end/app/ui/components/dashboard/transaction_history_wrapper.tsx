import { BASE_URL, linkedLibraryDict, Transaction } from "@/app/lib/definitions/definition";
import { getAccessToken } from "@/app/lib/utilities/server_utilities";
import TransactionHistory from "./transaction_history";
import { splitDatetimeString } from "@/app/lib/utilities/utilities";

export default async function TransactionHistoryWrapper() {
    let transactions: Transaction[] = []
    let bankAccountNumbers: string[] = [] 

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
        bankAccountNumbers = data.data.accounts.map((account:any) => account.account_number)
    } catch(error) {
        throw error
    }

    try {
        const response = await fetch(`${BASE_URL}/transaction/search`, {
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
        const filteredData = data.data.transactions.filter((transaction:any) => transaction.status === "SUCCESS")
        transactions = filteredData.map((transaction:any) => {
            const isReceive = bankAccountNumbers.includes(transaction.destination_account)
            const accountNumber = isReceive ? transaction.source_account : transaction.destination_account
            let transactionName
            switch (transaction.transaction_type) {
                case "internal":
                    transactionName = "Internal"
                    break
                case "external":
                    transactionName = linkedLibraryDict[transaction.destination_bank].name || "Unknown bank"
                    break
                case "debt-payment":
                    transactionName = "Debt resolve"
                    break
                case "internal-deposit":
                    transactionName = "Deposit"
                    break
            }
            return ({
                id: transaction.id,
                accountNumber,
                transactionName,
                transactionType: transaction.transaction_type,
                transactionDate: splitDatetimeString(transaction.transaction_date),
                amount: transaction.amount,
                isReceive
            })
        })
    } catch(error) {
        throw error
    }

    // console.log(transactions)

    return (
        <TransactionHistory transactions={transactions}/>
    )
}