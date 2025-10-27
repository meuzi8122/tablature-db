import { Instrument, INSTRUMENTS } from "@/schemas/tablature";
import { getButtonClass } from "./util";

type Props = {
    instrument: string | null;
    handleInstrumentButtonClick: (instrument: Instrument) => void;
};

export function InstrumentSection({ instrument, handleInstrumentButtonClick }: Props) {
    return (
        <div className="shadow-md p-4">
            <h3 className="mb-2 font-bold">楽器</h3>
            <div className="flex space-x-1.5 space-y-2 flex-wrap overflow-y-scroll max-h-30">
                {INSTRUMENTS.map((_instrument, index) => (
                    <button
                        key={`${_instrument}-${index}`}
                        type="button"
                        className={getButtonClass(_instrument === instrument)}
                        onClick={() => handleInstrumentButtonClick(_instrument as Instrument)}
                    >
                        {_instrument}
                    </button>
                ))}
            </div>
        </div>
    );
}
