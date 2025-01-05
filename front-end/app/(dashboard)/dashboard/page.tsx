import { revalidateDashboard } from "@/app/lib/actions/revalidation";
import BlockLoading from "@/app/ui/components/dashboard/block_loading";
import DebtReminder from "@/app/ui/components/dashboard/debt_reminder";
import MyBalanceWrapper from "@/app/ui/components/dashboard/my_balance_wrapper";
import QuickTransfer from "@/app/ui/components/dashboard/quick_transfer";
import QuickTransferWrapper from "@/app/ui/components/dashboard/quick_transfer_wrapper";
import TransactionHistory from "@/app/ui/components/dashboard/transaction_history";
import TransactionHistoryWrapper from "@/app/ui/components/dashboard/transaction_history_wrapper";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { Suspense } from "react";

export default function Page() {
    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">Welcome, user 🔥</span>
                <form action={revalidateDashboard}>
                    <button className="flex items-center justify-center gap-2 rounded-md px-3 py-2 bg-blue-600 text-blue-50 text-sm font-medium hover:bg-blue-700 transition-colors duration-300">
                        <ArrowPathIcon className="w-4"/>
                        <p className="hidden md:block">Refresh</p>
                    </button>
                </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[3fr_5fr] gap-4">
                <div className="flex flex-col gap-y-4">
                    <Suspense fallback={<BlockLoading/>}>
                        <MyBalanceWrapper/>
                    </Suspense>
                    <Suspense fallback={<BlockLoading/>}>
                        <QuickTransferWrapper/>
                    </Suspense>
                    <DebtReminder/>
                </div>
                <div className="flex flex-col gap-y-4">
                    <Suspense fallback={<BlockLoading/>}>
                        <TransactionHistoryWrapper/>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}