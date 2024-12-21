import RechargePageContent from "@/app/ui/components/recharge/recharge_page_content";

export default function Page() {
    return (
        <div className="flex flex-col gap-y-4">
            <span className="text-2xl font-bold">Recharge a customer's bank account</span>
            <RechargePageContent/>
        </div>
    )
}