"use server";

import { TablatureClient } from "@/clients/cms/tablature";

type Props = {
    artistId?: string;
};

export async function TablatureList({ artistId }: Props) {
    const tablatures = artistId
        ? await TablatureClient.findTablatures(artistId)
        : await TablatureClient.findLatestTablatures();

    // const filteredTablatures = tablatures.filter((tablature) => {
    //     if (instrument && tablature.instrument !== instrument) {
    //         return false;
    //     }

    //     if (strings && tablature.strings !== strings) {
    //         return false;
    //     }

    //     return true;
    // });
    const filteredTablatures = tablatures;

    const result = (() => {
        if (artistId == null) {
            if (filteredTablatures.length === 0) return "条件に一致するTAB譜が見つかりませんでした";
            return "最近追加されたTAB譜";
        }

        if (filteredTablatures.length === 0) return "条件に一致するTAB譜が見つかりませんでした";
        return `${filteredTablatures.length}件のTAB譜が見つかりました`;
    })();

    return (
        <ul className="list bg-base-100 rounded-box shadow-md">
            <li className="text-sm p-4 pb-2 opacity-60 tracking-wide">{result}</li>
            {tablatures.map((tablature) => (
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
                        <div className="text-sm uppercase font-semibold opacity-60">
                            {tablature.owner ?? "配信元サイト不明"}
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
