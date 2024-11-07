import { Label } from "flowbite-react";
import { MOODS, MOOD_COLORS } from "../constants";

interface MoodSelectorProps {
  selectedMood: string | null;
  onMoodSelect: (mood: string) => void;
}

export const MoodSelector = ({
  selectedMood,
  onMoodSelect,
}: MoodSelectorProps) => {
  return (
    <Label className="mb-4">
      <p className="mb-2">기분을 알려주세요.</p>
      <div>
        {MOODS.map((mood) => (
          <span
            key={mood}
            className={`text-xs font-medium me-2 px-3 py-1 rounded-full cursor-pointer ${
              selectedMood === mood
                ? MOOD_COLORS[mood]
                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
            }`}
            onClick={() => onMoodSelect(mood)}
          >
            {mood}
          </span>
        ))}
      </div>
    </Label>
  );
};
