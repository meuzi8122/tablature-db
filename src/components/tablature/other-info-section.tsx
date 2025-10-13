import type { Instrument } from "@/clients/cms/tablature";
import { INSTRUMENTS } from "@/schemas/tablature";
import { getButtonClass } from "./util";

type Props = {
    instrument: string | null;
    strings: number | null;
    handleInstrumentButtonClick: (instrument: Instrument) => void;
    handleStringsButtonClick: (strings: number) => void;
};

export function OtherInfoSection({
    instrument,
    strings,
    handleInstrumentButtonClick,
    handleStringsButtonClick,
}: Props) {
    return (
        <div className="flex flex-col space-y-4 shadow-md p-4 overflow-x-scroll">
            <div>
                <h3 className="mb-2 font-bold">楽器</h3>
                <div className="flex space-x-1.5">
                    {INSTRUMENTS.map((_instrument, index) => (
                        <button
                            key={`${_instrument}-${index}`}
                            className={getButtonClass(_instrument === instrument)}
                            onClick={() => handleInstrumentButtonClick(_instrument as Instrument)}
                        >
                            {_instrument}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="mb-2 font-bold">弦数</h3>
                <div className="flex space-x-1.5">
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
    );
}
