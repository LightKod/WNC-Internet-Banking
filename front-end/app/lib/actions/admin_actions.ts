'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { BASE_URL } from "../definitions/definition"
import { getAccessToken } from "../utilities/server_utilities"
import { AssignEmployeeFormValues } from "../schemas/schemas"

export async function toggleBanEmployee (id: string, action: string) {
    try {
        const response = await fetch(`${BASE_URL}/user/ban-unban`, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                employeeId: id,
                action
            })
        })

        if(!response.ok) {
            throw new Error("Something went wrong")
        }
    } catch(error) {
        throw error
    }
    revalidatePath('/admin/manage-employee')
    redirect('/admin/manage-employee')
}

export async function assignEmployee (data: AssignEmployeeFormValues) {
    try {
        const response = await fetch(`${BASE_URL}/user/assign`, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: data.username
            })
        })

        if(!response.ok) {
            throw new Error("Something went wrong")
        }
    } catch(error) {
        throw error
    }
    revalidatePath('/admin/manage-employee')
    redirect('/admin/manage-employee')
}

export async function unassignEmployee (id: string) {
    try {
        const response = await fetch(`${BASE_URL}/user/unassign`, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                employeeId: id
            })
        })

        if(!response.ok) {
            throw new Error("Something went wrong")
        }
    } catch(error) {
        throw error
    }
    revalidatePath('/admin/manage-employee')
    redirect('/admin/manage-employee')

    revalidatePath('/admin/manage-employee')
    redirect('/admin/manage-employee')
}