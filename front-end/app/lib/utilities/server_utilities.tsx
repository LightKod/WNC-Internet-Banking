import { cookies } from "next/headers"

export function getAccessToken() {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')?.value
    return accessToken || ''
}