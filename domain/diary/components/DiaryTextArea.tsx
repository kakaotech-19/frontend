import { Textarea } from "flowbite-react";

interface DiaryTextAreaProps {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const DiaryTextArea = ({ text, onChange }: DiaryTextAreaProps) => {
  return (
    <div className="relative mt-4">
      <Textarea
        className="h-96 text-md"
        maxLength={3000}
        value={text}
        onChange={onChange}
        placeholder="오늘의 이야기를 들려주세요! (100자 이상)"
      />
      <div className="absolute bottom-4 right-4 text-sm text-gray-500">
        {text.length} / 3000
      </div>
    </div>
  );
};
