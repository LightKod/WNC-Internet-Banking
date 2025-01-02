export default function ContactModalLoading() {
    return (
        <div className="flex gap-x-4 items-center p-4 bg-slate-100 rounded-md animate-pulse">
            <div className="w-12 h-12 rounded-full bg-slate-300"/>
            <div className="flex flex-col gap-y-1 items-start">
                <div className="h-4 w-16 bg-slate-300 rounded-md"/>
                <div className="h-4 w-16 bg-slate-300 rounded-md"/>
                <div className="h-4 w-32 bg-slate-300 rounded-md"/>
            </div>
        </div>
    )
}