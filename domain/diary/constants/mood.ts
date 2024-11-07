export const MOODS = [
  "행복해요",
  "평온해요",
  "생각이많아요",
  "아쉬워요",
  "씁쓸해요",
] as const;

export const MOOD_COLORS = {
  행복해요: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  평온해요:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300",
  생각이많아요:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  아쉬워요: "bg-gray-500 text-gray-100 dark:bg-gray-900 dark:text-gray-300",
  씁쓸해요: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
} as const;
