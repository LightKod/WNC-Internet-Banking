'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function toggleBanEmployee (id: string) {
    console.log(`Toggle ban employee with id: ${id}`)

    revalidatePath('/admin/manage-employee')
    redirect('/admin/manage-employee')
}

export async function unassignEmployee (id: string) {
    console.log(`Unassign employee with id: ${id}`)

    revalidatePath('/admin/manage-employee')
    redirect('/admin/manage-employee')
}