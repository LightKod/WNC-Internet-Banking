import { BASE_URL } from "@/app/lib/definitions/definition"
import { getAccessToken } from "@/app/lib/utilities/server_utilities"
import NavBar from "./navbar"

export default async function NavBarWrapper() {
    let userRole = ""

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

    return (
        <NavBar userRole={userRole}/>
    )
}