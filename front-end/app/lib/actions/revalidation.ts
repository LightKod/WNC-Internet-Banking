'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function revalidateDashboard() {
    revalidatePath('/dashboard')
    redirect('/dashboard')
}

export async function revalidatePaymentRequest() {
    revalidatePath('/payment-request')
    redirect('/payment-request')
}

export async function revalidateManageEmployee() {
    revalidatePath('/admin/manage-employee')
    redirect('/admin/manage-employee')
}