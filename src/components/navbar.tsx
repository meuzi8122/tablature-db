import Link from "next/link";
import { MenuIcon } from "./icon/menu-icon";

export function Navbar() {
    return (
        <div className="navbar bg-base-100 shadow-sm mb-6">
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost text-xl font-bold">
                    TablatureDB
                </Link>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        <MenuIcon />
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm"
                    >
                        <li>
                            <Link href="/">ホーム</Link>
                        </li>
                        <li>
                            <Link href="/tablatures/new">TAB譜を投稿</Link>
                        </li>
                        <li>
                            <Link href="/bookmarks">ブックマークしたTAB譜</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
