export default function Loading() {
    return (
        <div className="flex flex-col gap-y-4 animate-pulse">
            <div className="h-8 w-72 bg-slate-300 rounded-md"/>
            <div className="w-full h-32 bg-slate-300 rounded-md"/>
            <div className="w-full h-16 bg-slate-300 rounded-md"/>
        </div>
    )
}