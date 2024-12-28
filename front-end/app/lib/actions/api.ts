'use server';
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = 'http://localhost:80/api'

export const login = async ({username, password, captchaValue}: {username: string, password: string, captchaValue: string}) => {
    try {
        console.log(process.env.RECAPTCHA_SECRET_KEY);
        console.log(captchaValue);
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
        cookies().set('accessToken', dataJson.data.accessToken, { maxAge: 30 });
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