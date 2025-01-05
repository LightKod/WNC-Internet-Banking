import { CubeTransparentIcon } from "@heroicons/react/24/outline";

export default function EmptyList({
    message,
    size = "sm"
} : {
    message: string,
    size? : "sm" | "lg"
}) {
    let padding = "p-4"
    
    switch (size) {
        case "sm":
            padding = "p-4"
            break
        case "lg":
            padding = "p-8"
            break
    }

    const style = `h-full w-full flex flex-col ${padding} gap-y-2 items-center justify-center text-gray-950`

    return (
        <div className={style}>
            <CubeTransparentIcon className="w-16"/>
            <div className="flex flex-col gap-y-1 items-center">
                <h2 className="font-semibold">It's empty here!</h2>
                <p className="text-xs text-gray-500 text-center">{message}</p>
            </div>
        </div>
    )
}