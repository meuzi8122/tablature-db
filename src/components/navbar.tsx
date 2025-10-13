import Link from "next/link";

export function Navbar() {
    return (
        <div className="navbar bg-primary shadow-sm mb-6">
            <div className="flex-1">
                <Link href="/" className="btn btn-primary text-xl font-bold">
                    TablatureDB
                </Link>
            </div>
            <div className="flex-none">
                <Link href="/tablatures/new" className="btn btn-circle btn-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
