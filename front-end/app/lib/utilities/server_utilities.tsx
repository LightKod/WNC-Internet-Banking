import { cookies } from "next/headers"

export function getAccessToken(): string {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')?.value
    
    if(!accessToken) {
        throw new Error("Non-existent accessToken")
    }
    return accessToken
}