import { BASE_URL } from "@/app/lib/definitions/definition"
import { getAccessToken } from "@/app/lib/utilities/server_utilities"
import HorizontalBar from "./horizontal_bar"

export default async function HorizontalBarWrapper() {
    let userRole = ""
    let userName = ""

    try {
        const response = await fetch(`${BASE_URL}/check-role`, {
            cache: 'no-store',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-type': 'application/json'
            }
        })

        if(response.status === 401) {
            throw new Error("401")
        }

        if(!response.ok) {
            throw new Error("Something went wrong")
        }

        const data = await response.json()
        userRole = data.role
    } catch(error) {
        throw error
    }

    try {
        const response = await fetch(`${BASE_URL}/user/info`, {
            cache: 'no-store',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-type': 'application/json'
            }
        })

        if(response.status === 401) {
            throw new Error("401")
        }

        if(!response.ok) {
            throw new Error("Something went wrong")
        }

        const data = await response.json()
        userName = data.data.user.username
    } catch(error) {
        throw error
    }

    return (
        <HorizontalBar userName={userName} userRole={userRole}/>
    )
}