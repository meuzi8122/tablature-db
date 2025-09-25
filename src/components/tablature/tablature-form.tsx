"use client";

import type { Artist } from "@/clients/cms/artist";
import type { Instrument } from "@/clients/cms/tablature";
import { useState } from "react";
import { ArtistSection } from "./artist-section";
import { OtherInfoSection } from "./other-info-section";

type Props = {
    artists: Artist[];
};

export function TablatureForm({ artists }: Props) {
    const [artistId, setArtistId] = useState<string | undefined>(undefined);
    const [instrument, setInstrument] = useState<Instrument | null>(null);
    const [strings, setStrings] = useState<number | null>(null);
    const [title, setTitle] = useState<string>("");
    const [url, setUrl] = useState<string>("");

    const handleArtistButtonClick = (_artistId: string) => {
        setArtistId((currentArtistId) => (currentArtistId === _artistId ? undefined : _artistId));
    };

    const handleInstrumentButtonClick = (_instrument: Instrument) => {
        setInstrument((currentInstrument) =>
            currentInstrument === _instrument ? null : _instrument,
        );
    };

    const handleStringsButtonClick = (_strings: number) => {
        setStrings((currentStrings) => (currentStrings === _strings ? null : _strings));
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTitle(() => value);
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUrl(() => value);
    };

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
            <div className="flex flex-col space-y-4 shadow-md p-4">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">楽曲名</legend>
                    <input type="text" className="input w-full" onChange={handleTitleChange} />
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">配信元サイトURL</legend>
                    <input type="text" className="input w-full" onChange={handleUrlChange} />
                </fieldset>
            </div>
            <div className="flex justify-end">
                <button className="btn rounded-md btn-secondary">TAB譜を投稿</button>
            </div>
        </div>
    );
}
