"use client";

import { useBookmarks } from "@/app/hooks/bookmark";
import { Tablature } from "@/clients/cms/tablature";
import { BoomarkIcon } from "@/components/icon/bookmark-icon";
import { NoBookmarkIcon } from "@/components/icon/no-bookmark-icon";
import { useContext, useMemo } from "react";
import { TablatureSearchContext } from "../tablature-search";

type Props = {
    artistId?: string;
    tablatures: Tablature[];
};

export function ClientTablatureList({ artistId, tablatures }: Props) {
    const { instrument, strings } = useContext(TablatureSearchContext);

    const filteredTablatures = tablatures.filter((tablature) => {
        if (instrument && tablature.instrument !== instrument) {
            return false;
        }

        if (strings && tablature.strings !== strings) {
            return false;
        }

        return true;
    });

    const result = (() => {
        if (artistId == null) {
            if (filteredTablatures.length === 0) return "条件に一致するTAB譜が見つかりませんでした";
            return "最近追加されたTAB譜";
        }

        if (filteredTablatures.length === 0) return "条件に一致するTAB譜が見つかりませんでした";
        return `${filteredTablatures.length}件のTAB譜が見つかりました`;
    })();

    const { bookmarks, addBookmark, deleteBookmark } = useBookmarks();
    // bookmarks以外の値が変わっても再計算しないようにする
    const bookmarksIds = useMemo(
        () => new Set((bookmarks || []).map((bookmark) => bookmark.id)),
        [bookmarks],
    );

    return (
        <ul className="list bg-base-100 rounded-box shadow-md">
            <li className="text-sm p-4 pb-2 opacity-60 tracking-wide">{result}</li>
            {filteredTablatures.map((tablature) => (
                <li className="list-row" key={tablature.id}>
                    <div>
                        <div className="text-lg">
                            <a
                                href={tablature.url}
                                className="link link-primary no-underline"
                                target="_blank"
                            >
                                {tablature.title}
                            </a>
                        </div>
                        <div className="text-sm font-semibold opacity-60">
                            {`${tablature.artist.name}（${tablature.instrument}・${tablature.strings}弦）`}
                        </div>
                    </div>
                    <div></div>
                    <div>
                        {bookmarksIds.has(tablature.id) ? (
                            <button
                                className="btn btn-square btn-ghost"
                                onClick={() => {
                                    deleteBookmark(tablature.id);
                                }}
                            >
                                <NoBookmarkIcon />
                            </button>
                        ) : (
                            <button
                                className="btn btn-square btn-ghost"
                                onClick={() => {
                                    addBookmark(tablature.id);
                                }}
                            >
                                <BoomarkIcon />
                            </button>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
}
