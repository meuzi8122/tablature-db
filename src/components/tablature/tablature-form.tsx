"use client";

import { createTablature } from "@/actions/tablature";
import { ContentType, Instrument } from "@/schemas/tablature";
import Form from "next/form";
import { ChangeEvent, useActionState, useEffect, useRef, useState } from "react";
import { InstrumentSection } from "./instrument-section";

export function TablatureForm() {
    const [state, action, isPending] = useActionState(createTablature, {
        success: false,
        message: "",
    });

    const [instrument, setInstrument] = useState<Instrument | null>(null);
    const handleInstrumentButtonClick = (_instrument: Instrument) => {
        setInstrument((currentInstrument) =>
            currentInstrument === _instrument ? null : _instrument,
        );
    };

    const [contentType, setContentType] = useState<ContentType>("URL");
    const handleContentTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContentType(e.target.value);
    };

    const handleSubmit = (formData: FormData) => {
        formData.append("instrument", instrument || "");
        action(formData);
    };

    const urlContentRef = useRef<HTMLInputElement>(null!);

    useEffect(() => {
        // ファイルにチェックを入れると、submit後にurlにチェックが入る（デフォルトチェック）がcontentTypeをFILEのままになるため
        if (urlContentRef.current.checked) {
            setContentType("URL");
        }
    }, [isPending]);

    return (
        <Form action={handleSubmit}>
            <div className="flex flex-col space-y-4">
                <InstrumentSection
                    instrument={instrument}
                    handleInstrumentButtonClick={handleInstrumentButtonClick}
                />
                <div className="flex flex-col space-y-4 shadow-md p-4">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">アーティスト名</legend>
                        <input name="artistName" type="text" className="input w-full" />
                    </fieldset>
                </div>
                <div className="flex flex-col space-y-4 shadow-md p-4">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">楽曲名</legend>
                        <input name="title" type="text" className="input w-full" />
                    </fieldset>
                </div>
                <div className="flex flex-col shadow-md p-4 space-y-1">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">投稿形式</legend>
                        <div className="flex space-x-4">
                            <div className="flex">
                                <label className="label cursor-pointer justify-start gap-2 w-fit">
                                    <input
                                        type="radio"
                                        name="type"
                                        className="radio radio-sm"
                                        defaultChecked
                                        onChange={handleContentTypeChange}
                                        value="URL"
                                        ref={urlContentRef}
                                    />
                                    <span className="label-text">URL</span>
                                </label>
                            </div>
                            <div className="flex">
                                <label className="label cursor-pointer justify-start gap-2 w-fit">
                                    <input
                                        type="radio"
                                        name="type"
                                        className="radio radio-sm"
                                        onChange={handleContentTypeChange}
                                        value="FILE"
                                    />
                                    <span className="label-text">ファイル</span>
                                </label>
                            </div>
                        </div>
                    </fieldset>
                    {contentType === "URL" && (
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">配信元サイトURL</legend>
                            <input name="url" type="text" className="input w-full" />
                        </fieldset>
                    )}
                    {contentType === "FILE" && (
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">TAB譜ファイル（PDF・GP）</legend>
                            <input
                                name="file"
                                type="file"
                                className="file-input file-input-sm file-input-ghost"
                                accept=".pdf, .gp, .gp5, .gpx"
                            />
                        </fieldset>
                    )}
                </div>
                <div className="flex space-x-4">
                    <span className="font-bold text-error flex-1">
                        {!state.success && state.message ? state.message : ""}
                    </span>
                    <button
                        type="submit"
                        className="btn rounded-md btn-primary flex-none"
                        disabled={isPending}
                    >
                        TAB譜を投稿
                    </button>
                </div>
            </div>
        </Form>
    );
}
