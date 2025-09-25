"use client";

import { createArtist } from "@/actions/artist";
import { createTablature } from "@/actions/tablature";
import type { Artist } from "@/clients/cms/artist";
import { type Instrument } from "@/clients/cms/tablature";
import { COMMON_ERROR_MESSAGE } from "@/contants/tablature";
import { createTablatureSchema } from "@/schemas/tablature";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArtistSection } from "./artist-section";
import { OtherInfoSection } from "./other-info-section";

type Props = {
    artists: Artist[];
};

export function TablatureForm({ artists }: Props) {
    const router = useRouter();

    const [artistId, setArtistId] = useState<string | undefined>(undefined);
    const [instrument, setInstrument] = useState<Instrument | null>(null);
    const [strings, setStrings] = useState<number | null>(null);
    const [title, setTitle] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [artistName, setArtistName] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleArtistButtonClick = (_artistId: string) => {
        setArtistId((currentArtistId) => (currentArtistId === _artistId ? undefined : _artistId));
        setArtistName(() => "");
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

    const handleArtistNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setArtistName(() => value);
        setArtistId(undefined);
    };

    const handleSubmit = async () => {
        const data = {
            artistId,
            instrument,
            strings,
            title,
            url,
        };

        if (!artistId && artistName.length > 0) {
            const createArtistFormData = new FormData();
            createArtistFormData.append("name", artistName);
            const createArtistResults = await createArtist(createArtistFormData);
            if (!createArtistResults.success) {
                setErrorMessage(COMMON_ERROR_MESSAGE);
                return;
            }

            if (createArtistResults.artistId) {
                data.artistId = createArtistResults.artistId;
            }
        }

        const submission = createTablatureSchema.safeParse(data);
        if (!submission.success) {
            setErrorMessage(submission.error.issues[0].message);
            return;
        }

        setErrorMessage(null);

        const formData = new FormData();
        formData.append("artistId", submission.data.artistId);
        formData.append("instrument", submission.data.instrument);
        formData.append("strings", submission.data.strings.toString());
        formData.append("title", submission.data.title);
        formData.append("url", submission.data.url);

        const { success, message } = await createTablature(formData);
        alert(message);

        if (success) {
            router.push("/");
        }
    };

    return (
        <div className="flex flex-col space-y-3">
            <ArtistSection
                artistId={artistId}
                artists={artists}
                handleArtistButtonClick={handleArtistButtonClick}
            />
            <div className="flex flex-col space-y-4 shadow-md p-4">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">
                        アーティストが選択肢に存在しない場合はこちらから入力
                    </legend>
                    <input
                        type="text"
                        className="input w-full"
                        value={artistName}
                        onChange={handleArtistNameChange}
                    />
                </fieldset>
            </div>
            <OtherInfoSection
                instrument={instrument}
                strings={strings}
                handleInstrumentButtonClick={handleInstrumentButtonClick}
                handleStringsButtonClick={handleStringsButtonClick}
            />
            <div className="flex flex-col space-y-4 shadow-md p-4">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">楽曲名</legend>
                    <input
                        type="text"
                        className="input w-full"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">配信元サイトURL</legend>
                    <input
                        type="text"
                        className="input w-full"
                        value={url}
                        onChange={handleUrlChange}
                    />
                </fieldset>
            </div>
            <div className="flex">
                <span className="font-bold text-error flex-1">{errorMessage}</span>
                <button className="btn rounded-md btn-secondary flex-none" onClick={handleSubmit}>
                    TAB譜を投稿
                </button>
            </div>
        </div>
    );
}
