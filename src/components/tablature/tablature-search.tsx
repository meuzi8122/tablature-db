"use client";

import type { Artist } from "@/clients/cms/artist";
import type { Instrument, Tablature } from "@/clients/cms/tablature";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
    artistId?: string;
    artists: Artist[];
    tablatures?: Tablature[];
};

export function TablatureSearch({ artistId, artists, tablatures = [] }: Props) {
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

    const getButtonClass = (isActive: boolean) => `btn rounded-md ${isActive ? "btn-primary" : ""}`;

    return (
        <div className="flex flex-col space-y-3">
            <div className="shadow-md p-3">
                {/* アーティストが増えたら枠の中でスクロールできるようにする */}
                <h3 className="mb-2 font-bold">アーティスト</h3>
                <div className="flex flex-wrap space-x-2 space-y-2">
                    {artists.map((_artist) => (
                        <button
                            key={_artist.id}
                            className={getButtonClass(_artist.id === artistId)}
                            onClick={() => handleArtistButtonClick(_artist.id)}
                        >
                            {_artist.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex flex-col space-y-4 shadow-md p-4">
                <div>
                    <h3 className="mb-2 font-bold">楽器</h3>
                    <div className="flex space-x-2">
                        {["エレキギター", "アコースティックギター", "エレキベース"].map(
                            (_instrument, index) => (
                                <button
                                    key={`${_instrument}-${index}`}
                                    className={getButtonClass(_instrument === instrument)}
                                    onClick={() =>
                                        handleInstrumentButtonClick(_instrument as Instrument)
                                    }
                                >
                                    {_instrument}
                                </button>
                            ),
                        )}
                    </div>
                </div>
                <div>
                    <h3 className="mb-2 font-bold">弦数</h3>
                    <div className="flex space-x-2">
                        {[4, 5, 6, 7].map((_strings) => (
                            <button
                                key={`strings-${_strings}`}
                                className={getButtonClass(_strings === strings)}
                                onClick={() => handleStringsButtonClick(_strings)}
                            >
                                {_strings}弦
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                {filteredTablatures.map((tablature) => (
                    <div key={tablature.id}>{tablature.title}</div>
                ))}
            </div>
            {filteredTablatures.length === 0 && <div className="mt-4">TAB譜が見つかりません</div>}
        </div>
    );
}
