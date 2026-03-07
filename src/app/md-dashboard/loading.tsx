export default function Loading() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#2C4B9B] border-t-transparent" />
                <p className="text-sm text-gray-400 animate-pulse">Loading…</p>
            </div>
        </div>
    );
}
