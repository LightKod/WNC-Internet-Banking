import { Suspense } from "react";
import HorizontalBarWrapper from "../ui/components/app_layout/horizontal_bar_wrapper";
import Logo from "../ui/components/app_layout/logo";
import NavBarWrapper from "../ui/components/app_layout/navbar_wrapper";
import NotificationToast from "../ui/components/app_layout/notification_toast";
import HorizontalBarLoading from "../ui/components/app_layout/horizontal_bar_loading";
import NavBarLoading from "../ui/components/app_layout/navbar_loading";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid h-screen grid-cols-1 md:grid-cols-[1fr_4fr] xl:grid-cols-[1fr_5fr] grid-rows-[auto_1fr]">
            <Logo/>
            <Suspense fallback={<HorizontalBarLoading/>}>
                <HorizontalBarWrapper/>
            </Suspense>
            <Suspense fallback={<NavBarLoading/>}>
                <NavBarWrapper/>
            </Suspense>

            <div className="p-4 md:overflow-y-auto bg-slate-50">{children}</div>

            <NotificationToast/>
        </div>
    )
}