'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function revalidateDashboard() {
    revalidatePath('//dashboard')
    redirect('/dashboard')
}
