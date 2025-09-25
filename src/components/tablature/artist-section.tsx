import { Artist } from "@/clients/cms/artist";
import { getButtonClass } from "./util";

type Props = {
    artistId: string | undefined;
    artists: Artist[];
    handleArtistButtonClick: (artistId: string) => void;
};

export function ArtistSection({ artistId, artists, handleArtistButtonClick }: Props) {
    return (
        <div className="shadow-md p-4">
            <h3 className="mb-2 font-bold">アーティスト</h3>
            <div className="flex space-x-2 flex-wrap space-y-2 overflow-y-scroll max-h-30">
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
    );
}
