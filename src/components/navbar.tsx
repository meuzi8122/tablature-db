import Link from "next/link";

export function Navbar() {
    return (
        <div className="navbar bg-base-100 shadow-sm mb-6">
            <Link href="/" className="btn btn-ghost text-xl">
                TablatureDB
            </Link>
        </div>
    );
}
