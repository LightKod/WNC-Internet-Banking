"use server";
import DeleteContact from "../contact/delete_contact";
import { getContacts } from "@/app/lib/actions/api";
import EditContact from "../contact/edit_contact";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

type contactType = {
  id: number,
  account_number: string,
  nickname: string,
  bank_id: string,
  bank_name: string,
  created_at: string
}

export default async function ContactTable() {
  const contacts = await getContacts();
  console.log(contacts);
  if (contacts.status === 0 && contacts.data.length !== 0) {
    return (
      <div>
        <table className="table-auto col-span-2 w-full bg-white select-none">
          <thead>
            <tr className="border-b-2 border-slate-200">
              <th className="pb-2.5">Card Number</th>
              <th>Owner</th>
              <th>Bank</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.data.map((item: contactType) => (
              <tr key={item.id} className="hover:bg-blue-50 transition-colors">
                <td className="text-center font-bold px-2 py-2.5 border-b-2 border-slate-100">
                  {item.account_number}
                </td>
                <td className="text-center  px-2 py-2.5 border-b-2 border-slate-100">
                  {item.nickname}
                </td>
                <td className=" text-center px-2 py-2.5 border-b-2 border-slate-100">
                  {item.bank_name}
                </td>
                <td className=" px-2 py-2.5 border-b-2 border-slate-100">
                  <div className="w-2/3 mx-auto flex gap-2">
                    <DeleteContact
                      contactId={item.id}
                      nickname={item.nickname}
                    />
                    <EditContact contactId={item.id} nickname={item.nickname} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center">
        <ExclamationCircleIcon className="size-20 text-slate-400" />
        <div className="text-slate-500 text-lg">No contact found</div>
      </div>
    );
  }
}
