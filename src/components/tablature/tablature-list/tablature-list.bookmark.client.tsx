"use client";

import { Tablature } from "@/clients/cms/tablature";
import { useBookmarks } from "@/hooks/bookmark";
import { useContext, useEffect, useMemo, useState } from "react";
import { TablatureSearchContext } from "../tablature-search";
import { TablatureListItem } from "./tablature-list-item";

export function ClientBookmarkedTablatureList() {
    const { bookmarks, addBookmark, deleteBookmark } = useBookmarks();
    // bookmarks以外の値が変わっても再計算しないようにする
    const bookmarkIds = useMemo(
        () => new Set((bookmarks || []).map((bookmark) => bookmark.id)),
        [bookmarks],
    );

    const { instrument, strings } = useContext(TablatureSearchContext);

    const [tablatures, setTablatures] = useState<Tablature[]>([]);

    const findTablatures = async (_bookmarkIds: string[]) => {
        if (_bookmarkIds.length === 0) {
            setTablatures([]);
            return;
        }

        const res = await fetch("/api/bookmarks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(_bookmarkIds),
        });
        const data = await res.json();
        setTablatures(data.tablatures);
    };

    useEffect(() => {
        findTablatures(Array.from(bookmarkIds));
    }, [bookmarkIds]);

    const filteredTablatures = useMemo(
        () =>
            tablatures.filter((tablature) => {
                if (instrument && tablature.instrument !== instrument) {
                    return false;
                }

                if (strings && tablature.strings !== strings) {
                    return false;
                }

                return true;
            }),
        [tablatures, instrument, strings],
    );

    const result = (() => {
        if (bookmarkIds.size === 0) return "ブックマークしているTAB譜はありません";
        if (filteredTablatures.length === 0) return "条件に一致するTAB譜が見つかりませんでした";
        return `${filteredTablatures.length}件のTAB譜が見つかりました`;
    })();

    return (
        <div className="flex flex-col gap-2 mt-2">
            <h4>ブックマークしたTAB譜</h4>
            <ul className="list bg-base-100 rounded-box shadow-md">
                <li className="text-sm p-4 pb-2 opacity-60 tracking-wide">{result}</li>
                {filteredTablatures.map((tablature) => (
                    <TablatureListItem
                        tablature={tablature}
                        key={tablature.id}
                        isBookmarked={bookmarkIds.has(tablature.id)}
                        addBookmark={addBookmark}
                        deleteBookmark={deleteBookmark}
                    />
                ))}
            </ul>
        </div>
    );
}
