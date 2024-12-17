import { Label } from "flowbite-react";
import { BGM_GENRE_COLORS, BGM_GENRES } from "../constants";

interface GenreSelectorProps {
  selectedGenre: string | null;
  onGenreSelect: (genre: string) => void;
}

export const GenreSelector = ({
  selectedGenre,
  onGenreSelect,
}: GenreSelectorProps) => {
  return (
    <Label className="mb-4">
      <p className="mb-2 mt-4">BGM 장르를 선택해주세요.</p>
      <div>
        {BGM_GENRES.map((genre) => (
          <span
            key={genre}
            className={`text-xs font-medium me-2 px-3 py-1 rounded-full cursor-pointer ${
              selectedGenre === genre
                ? BGM_GENRE_COLORS[genre]
                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
            }`}
            onClick={() => onGenreSelect(genre)}
          >
            {genre}
          </span>
        ))}
      </div>
    </Label>
  );
};
