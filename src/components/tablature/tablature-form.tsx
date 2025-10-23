"use client";

import { createArtist } from "@/actions/artist";
import { createTablature } from "@/actions/tablature";
import { COMMON_ERROR_MESSAGE } from "@/constants/tablature";
import { createTablatureSchema, Instrument } from "@/schemas/tablature";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { InstrumentSection } from "./instrument-section";

export function TablatureForm() {
    const router = useRouter();

    const [instrument, setInstrument] = useState<Instrument | null>(null);
    const [title, setTitle] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [artistName, setArtistName] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleInstrumentButtonClick = (_instrument: Instrument) => {
        setInstrument((currentInstrument) =>
            currentInstrument === _instrument ? null : _instrument,
        );
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
    };

    const handleSubmit = async () => {
        const data = {
            instrument,
            title,
            url,
        };

        // アーティストを登録
        const createArtistFormData = new FormData();
        createArtistFormData.append("name", artistName);

        const createArtistResults = await createArtist(createArtistFormData);
        if (!createArtistResults.success || !createArtistResults.artistId) {
            setErrorMessage(COMMON_ERROR_MESSAGE);
            return;
        }

        const submission = createTablatureSchema.safeParse({
            ...data,
            artistId: createArtistResults.artistId,
        });
        if (!submission.success) {
            setErrorMessage(submission.error.issues[0].message);
            return;
        }

        setErrorMessage(null);

        const formData = new FormData();
        formData.append("artistId", createArtistResults.artistId);
        formData.append("instrument", submission.data.instrument);
        formData.append("title", submission.data.title);
        formData.append("url", submission.data.url);

        const { success, message } = await createTablature(formData);
        alert(message);

        if (success) {
            router.push("/");
        }
    };

    return (
        <div className="flex flex-col space-y-4">
            <InstrumentSection
                instrument={instrument}
                handleInstrumentButtonClick={handleInstrumentButtonClick}
            />
            <div className="flex flex-col space-y-4 shadow-md p-4">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">アーティスト名</legend>
                    <input
                        type="text"
                        className="input w-full"
                        value={artistName}
                        onChange={handleArtistNameChange}
                    />
                </fieldset>
            </div>
            <div className="flex flex-col shadow-md p-4">
                <fieldset className="fieldset mb-2">
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
                <button className="btn rounded-md btn-primary flex-none" onClick={handleSubmit}>
                    TAB譜を投稿
                </button>
            </div>
        </div>
    );
}
