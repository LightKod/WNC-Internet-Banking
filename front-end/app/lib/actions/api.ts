'use server';
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = 'http://localhost:80/api'

export const login = async ({username, password, captchaValue}: {username: string, password: string, captchaValue: string}) => {
    try {
        // console.log(process.env.RECAPTCHA_SECRET_KEY);
        // console.log(captchaValue);
        const captcha = await googleRecaptcha(captchaValue);
        
        if(captcha.success === false) {
            return {
                status: -1
            }
        }
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        if(!response.ok) {
            return {
                status: response.status
            };
        }
        const dataJson = await response.json();
        cookies().set('accessToken', dataJson.data.accessToken, { maxAge: 15 * 60 });
        cookies().set('refreshToken', dataJson.data.refreshToken, {maxAge: 60 * 60 * 24 * 7});
        redirect('/dashboard');
    } catch(error) {
        throw error;
    }
}

export const checkRole = async (accessToken: string) => {
    try {
        const response = await fetch(`${BASE_URL}/check-role`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/json'
            }
        });
        return response;
    } catch(error) {
        throw error;
    }
}

export const handleRefreshToken = async () => {
    try {
        const refreshToken = cookies().get('refreshToken')?.value;
        const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                refreshToken
            })
        })
        return (await response.json());
    } catch(error) {
        throw error;
    }
}

export const addContact = async ({ account_number, nickname, bank_id, bank_name }: { account_number: string, nickname: string, bank_id?: number, bank_name: string }) => {
    try {
        const response = await fetch(`${BASE_URL}/user-contacts`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${cookies().get('accessToken')?.value}`
            },
            body: JSON.stringify({
                account_number,
                nickname,
                bank_id,
                bank_name
            })
        })
        revalidatePath('/contacts');
        return (await response.json());
    } catch(error) {
        throw error;
    }
}

export const getContacts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/user-contacts`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${cookies().get('accessToken')?.value}`
            }
        });
        return (await response.json());
    } catch(error) {
        throw error;
    }
}

export const deleteContact = async (contactId: number) => {
    try {
        const response = await fetch(`${BASE_URL}/user-contacts/${contactId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${cookies().get('accessToken')?.value}`
            }
        });
        revalidatePath('/contacts');
        return (await response.json());
    } catch(error) {
        throw error;
    }
}

export const googleRecaptcha = async (captchaValue: string) => {
    try {
        const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaValue}`, {
            method: "GET",
        });
        return (await response.json());
    } catch(error) {
        throw error;
    }
}

export const getTransactions = async ({query, from, to, page}: {query: string, from: string, to: string, page: string}) => {
    try {
        const params = new URLSearchParams({query, from, to, page}).toString();
        const response = await fetch(`${BASE_URL}/transaction/search?${params}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${cookies().get('accessToken')?.value}`
            }
        });
        return (await response.json());
    } catch(error) {
        throw error;
    }
}

export const getTotalTransactionPages = async ({query, from, to}: {query: string, from: string, to: string}) => {
    try {
        const params = new URLSearchParams({query, from, to}).toString();
        const response = await fetch(`${BASE_URL}/transaction/pages?${params}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${cookies().get('accessToken')?.value}`
            }
        })
        return (await response.json());
    } catch(error) {
        throw error;
    }
}

export const sendOTP = async (email: string) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/send-otp`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        });
        return (await response.json());
    } catch(error) {
        throw error;
    }
}

export const updateContact = async (contactId: number, {nickname, account_number}: {nickname: string, account_number?: string}) => {
    try {
        const response = await fetch(`${BASE_URL}/user-contacts/${contactId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${cookies().get('accessToken')?.value}`
            },
            body: JSON.stringify({
                nickname,
                account_number
            })
        });
        revalidatePath('/contacts')
        return (await response.json());
    } catch(error) {
        throw error;
    }
}

export const verifyOtp = async ({otp_code, email, otp_id}: {otp_code: string, email: string, otp_id: number}) =>  {
    try {
        const response = await fetch(`${BASE_URL}/auth/verify-otp`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                otp_code,
                email,
                otp_id
            })
        })
        return (await response.json());
    } catch(error) {
        throw error;
    }
}

export const resetPassword = async ({otp_id, new_password}: {otp_id: number, new_password: string}) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                otp_id,
                new_password
            })
        });
        return (await response.json());
    } catch(error) {
        throw error;
    }
}