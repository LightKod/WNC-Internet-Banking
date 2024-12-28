export default function NavBarLoading() {
    return (
        <div className="h-full border-r-2 p-2 border-slate-100 hidden md:block">
            <div className="flex flex-col gap-y-4 animate-pulse">
                <div className="flex flex-col gap-y-2">
                    <div className="h-5 w-16 bg-slate-300 rounded-md"/>
                    <div className="h-9 w-full bg-slate-300 rounded-md"/>
                    <div className="h-9 w-full bg-slate-300 rounded-md"/>
                    <div className="h-9 w-full bg-slate-300 rounded-md"/>
                </div>
                <div className="flex flex-col gap-y-2">
                    <div className="h-5 w-16 bg-slate-300 rounded-md"/>
                    <div className="h-9 w-full bg-slate-300 rounded-md"/>
                    <div className="h-9 w-full bg-slate-300 rounded-md"/>
                </div>
            </div>
        </div>
    )
}