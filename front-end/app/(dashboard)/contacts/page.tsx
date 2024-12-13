import AddContact from "@/app/ui/components/contact/add_contact";
import ContactTable from "@/app/ui/components/dashboard/contact_table";
import React from "react";

export default function Contacts() {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold">Your Contacts</h1>
        <AddContact />
      </div>
      <div className="flex gap-2">
        <div className="w-full mt-3 border-2 border-slate-100 rounded-md px-8 py-4 bg-white">
          <ContactTable />
        </div>
      </div>
    </div>
  );
}
