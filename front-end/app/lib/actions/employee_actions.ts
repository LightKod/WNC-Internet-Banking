'use server'

import { getAccessToken } from "../utilities/server_utilities";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CustomerRegisterFormValues, RechargeFormValues } from "../schemas/schemas";
import { goToLogin } from "./actions";

const BASE_URL = 'http://localhost:80/api'

export const registerCustomerAccount = async (data: CustomerRegisterFormValues) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: data.username,
                name: data.name,
                password: data.password,
                email: data.email,
                phone_number: data.phone
            })
        })

        if(!response.ok) {
            return {
                isSuccessful: false,
                error: "Something went wrong"
            }
        }

        return {
            isSuccessful: true,
        }
    } catch(error) {
        throw error
    }
}

export const rechargeCustomerAccount = async (data: RechargeFormValues) => {
    try {
        const response = await fetch(`${BASE_URL}/transfer/internal/deposit`, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                infoType: data.infoType,
                accountInfo: data.accountInfo,
                amount: data.amount
            })
        })

        if(!response.ok) {
            const result = await response.json()
            return {
                isSuccessful: false,
                error: result.message
            }
        }

        return {
            isSuccessful: true,
        }
    } catch(error) {
        throw error
    }
}