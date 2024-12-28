export default function HorizontalBarLoading() {
    return (
        <div className="border-b-2 border-slate-100">
            <div className="flex p-4 justify-between items-center animate-pulse">
                <div className="h-6 w-48 bg-slate-300 rounded-md hidden md:block"/>
                <span className="font-extrabold text-2xl text-gray-950 md:hidden">Bankit!</span>
                <div className="hidden gap-x-3 items-center md:flex">
                    <div className="p-2.5 rounded-md bg-slate-300">
                        <div className="w-5 h-5"></div>
                    </div>
                    <div className="p-2.5 rounded-md bg-slate-300">
                        <div className="w-5 h-5"></div>
                    </div>
                    <div className="p-2.5 rounded-md bg-slate-300">
                        <div className="w-24 h-5"></div>
                    </div>
                </div>
                <div className="p-2.5 rounded-md bg-slate-300 md:hidden">
                    <div className="w-5 h-5"></div>
                </div>
            </div> 
        </div>
    )
}