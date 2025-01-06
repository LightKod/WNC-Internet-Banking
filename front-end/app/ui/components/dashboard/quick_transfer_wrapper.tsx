import { BASE_URL, Contact, linkedLibraryDict } from "@/app/lib/definitions/definition";
import { getAccessToken } from "@/app/lib/utilities/server_utilities";
import QuickTransfer from "./quick_transfer";

export default async function QuickTransferWrapper() {
    let contacts: Contact[] = []

    try {
        const response = await fetch(`${BASE_URL}/user-contacts`, {
            cache: 'no-store',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-type': 'application/json'
            }
        })

        if(!response.ok) {
            throw new Error("Something went wrong")
        }

        const data = await response.json()
        const slicedData = data.data.slice(0, 6)
        contacts = slicedData.map((contact:any) => ({
            name: contact.nickname,
            accountNumber: contact.account_number,
            bankName: contact.bank_name
        }))
    } catch(error) {
        throw error
    }

    // console.log(contacts)
    
    return (
        <QuickTransfer contacts={contacts}/>
    )
}