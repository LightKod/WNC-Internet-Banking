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
        (await cookies()).set('accessToken', dataJson.data.accessToken);
        redirect('/dashboard');
    } catch(error) {
        throw error;
    }
}