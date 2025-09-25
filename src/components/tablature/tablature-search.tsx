"use client";

import type { Artist } from "@/clients/cms/artist";
import type { Instrument, Tablature } from "@/clients/cms/tablature";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArtistSection } from "./artist-section";
import { OtherInfoSection } from "./other-info-section";

type Props = {
    artistId?: string;
    artists: Artist[];
    tablatures: Tablature[];
};

export function TablatureSearch({ artistId, artists, tablatures }: Props) {
    const router = useRouter();

    const handleArtistButtonClick = (_artistId: string) => {
        router.push(`/tablatures/${_artistId}`);
    };

    const [instrument, setInstrument] = useState<Instrument | null>(null);
    const [strings, setStrings] = useState<number | null>(null);

    const handleInstrumentButtonClick = (_instrument: Instrument) => {
        setInstrument((currentInstrument) =>
            currentInstrument === _instrument ? null : _instrument,
        );
    };

    const handleStringsButtonClick = (_strings: number) => {
        setStrings((currentStrings) => (currentStrings === _strings ? null : _strings));
    };

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

    return (
        <div className="flex flex-col space-y-3">
            <ArtistSection
                artistId={artistId}
                artists={artists}
                handleArtistButtonClick={handleArtistButtonClick}
            />
            <OtherInfoSection
                instrument={instrument}
                strings={strings}
                handleInstrumentButtonClick={handleInstrumentButtonClick}
                handleStringsButtonClick={handleStringsButtonClick}
            />
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
                            <div className="text-sm uppercase font-semibold opacity-60">
                                {tablature.owner ?? "配信元サイト不明"}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
