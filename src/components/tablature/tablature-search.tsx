"use client";

import { Instrument } from "@/clients/cms/tablature";
import { createContext, Suspense, useState } from "react";
import { OtherInfoSection } from "./other-info-section";

type Props = {
    ArtistSection: React.ReactNode;
    TablatureList: React.ReactNode;
};

export const TablatureSearchContext = createContext<{
    instrument: Instrument | null;
    strings: number | null;
}>({
    instrument: null,
    strings: null,
});

export function TablatureSearch({ ArtistSection, TablatureList }: Props) {
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

    return (
        <div className="flex flex-col space-y-3">
            <Suspense
                fallback={
                    <div className="shadow-md p-4">
                        <h3 className="mb-2 font-bold">アーティスト</h3>
                        <div className="max-h-30">
                            <span className="text-sm pb-2 opacity-60 tracking-wide">
                                アーティストを取得中..
                            </span>
                        </div>
                    </div>
                }
            >
                {ArtistSection}
            </Suspense>
            <OtherInfoSection
                instrument={instrument}
                strings={strings}
                handleInstrumentButtonClick={handleInstrumentButtonClick}
                handleStringsButtonClick={handleStringsButtonClick}
            />
            <TablatureSearchContext.Provider value={{ instrument, strings }}>
                <Suspense
                    fallback={
                        <ul className="list bg-base-100 rounded-box shadow-md">
                            <li className="text-sm p-4 pb-2 opacity-60 tracking-wide">
                                TAB譜を取得中..
                            </li>
                        </ul>
                    }
                >
                    {TablatureList}
                </Suspense>
            </TablatureSearchContext.Provider>
        </div>
    );
}
