import { Tablature } from "@/clients/cms/tablature";
import { BookmarkIcon } from "@/components/icon/bookmark-icon";
import { NoBookmarkIcon } from "@/components/icon/no-bookmark-icon";

type Props = {
    tablature: Tablature;
    isBookmarked: boolean;
    addBookmark: (id: string) => void;
    deleteBookmark: (id: string) => void;
};

export function TablatureListItem({ tablature, isBookmarked, addBookmark, deleteBookmark }: Props) {
    return (
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
                {isBookmarked ? (
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
                        <BookmarkIcon />
                    </button>
                )}
            </div>
        </li>
    );
}
