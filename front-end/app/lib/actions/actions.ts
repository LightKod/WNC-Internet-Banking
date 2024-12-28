'use server'

import { getAccessToken } from "../utilities/server_utilities";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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