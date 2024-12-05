import HorizontalBar from "../ui/components/app_layout/horizontal_bar";
import Logo from "../ui/components/app_layout/logo";
import NavBar from "../ui/components/app_layout/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid h-screen grid-cols-[1fr_5fr] grid-rows-[auto_1fr]">
            <Logo/>
            <HorizontalBar/>
            <NavBar/>
            <div className="p-4 md:overflow-y-auto bg-slate-50">{children}</div>
        </div>
    )
}