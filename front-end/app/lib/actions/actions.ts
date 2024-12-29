'use server'

import { getAccessToken } from "../utilities/server_utilities";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { InternalTransferFormValues } from "../schemas/schemas";

const BASE_URL = 'http://localhost:80/api'

export async function goToLogin() {
    cookies().delete('accessToken')
    cookies().delete('refreshToken')
    redirect("/login")
}

export const getUserAccounts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/account/user`, {
            cache: 'no-store',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-type': 'application/json'
            }
        })

        if(!response.ok) {
            goToLogin()
        }

        const data = await response.json()
        return data.data.accounts.map((account:any) => ({
            accountType: account.account_type,
            accountNumber: account.account_number,
            balance: account.balance
        }))
    } catch(error) {
        throw error
    }
}

export const getInternalUserFromBankAccount = async (accountNumber: string) => {
    try {
        const response = await fetch(`${BASE_URL}/account/user/${accountNumber}`, {
            cache: 'no-store',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-type': 'application/json'
            }
        })

        if(response.status === 404) {
            return null
        }

        if(!response.ok) {
            goToLogin()
        }

        const data = await response.json()
        return {
            name: data.data.username,
            accountNumber: data.data.account_number,
            bankName: "Internal"
        }
    } catch(error) {
        throw error
    }
}

export const internalTransfer = async (data: InternalTransferFormValues) => {
    try {
        const response = await fetch(`${BASE_URL}/transfer/internal/initiate`, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                source_account_number: data.senderAccountNumber, 
                destination_account_number: data.receiverAccountNumber, 
                amount: data.amount, 
                content: data.transferNote, 
                fee_payer: data.isSelfFeePayment === "true" ? "sender" : "receiver"
            })
        })

        if(!response.ok) {
            goToLogin()
        }

        const result = await response.json()
        if(result.status === -1) {
            return "-1"
        }
        else {
            return result.data.data.id.toString()
        }
    } catch(error) {
        throw error
    }
}

export const confirmInternalTransfer = async (id: string, otp: string) => {
    try {
        const response = await fetch(`${BASE_URL}/transfer/internal/confirm`, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                otp_code: otp,
                transaction_id: id
            })
        })

        if(response.status === 400) {
            return {
                isSuccessful: false,
                error: "Something went wrong"
            }
        }

        if(!response.ok) {
            goToLogin()
        }

        return {
            isSuccessful: true
        }
    } catch(error) {
        throw error
    }
}

export const checkContactExistence = async (accountNumber: string, bankId: string) => {
    try {
        const response = await fetch(`${BASE_URL}/user-contacts/check-existence`, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                account_number: accountNumber,
                bank_id: bankId
            })
        })

        if(!response.ok) {
            goToLogin()
        }

        const data = await response.json()
        return data.data
    } catch(error) {
        throw error
    }
}

export const addContact = async (accountNumber: string, nickName: string, bankId: string, bankName: string) => {
    try {
        const response = await fetch(`${BASE_URL}/user-contacts/`, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                account_number: accountNumber,
                nickname: nickName,
                bank_id: bankId,
                bank_name: bankName
            })
        })

        if(!response.ok) {
            goToLogin()
        }

        return true
    } catch(error) {
        throw error
    }
}