import TransferPageContent from "@/app/ui/components/transfer/transfer_page_content";

export default function Page() {
    return (
        <div className="flex flex-col gap-y-4">
            <span className="text-2xl font-bold">Perform a transaction</span>
            <TransferPageContent/>
        </div>
    )
}