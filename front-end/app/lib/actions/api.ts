'use server';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = 'http://localhost:80/api'

export const login = async ({username, password}: {username: string, password: string}) => {
    try {
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
        cookies().set('accessToken', dataJson.data.accessToken);
        cookies().set('refreshToken', dataJson.data.refreshToken);
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
                'Content-type': 'application/json',
                Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
                Cookies: `refreshToken=${refreshToken};path=/;expires=Session`
            },
            credentials: 'include'
        })
        return response;
    } catch(error) {
        throw error;
    }
}