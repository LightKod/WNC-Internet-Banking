export default function BlockLoading() {
    return (
        <div className="flex flex-col gap-y-4 p-4 bg-white border-2 border-slate-100 rounded-md shadow-sm animate-pulse">
            <div className="flex justify-between items-center">
                <div className="h-6 w-24 bg-slate-300 rounded-md"/>
                <div className="h-6 w-6 bg-slate-300 rounded-md"/>
            </div>
            <div className="h-12 w-full bg-slate-300 rounded-md"/>
        </div>
    )
}