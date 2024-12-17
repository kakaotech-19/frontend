export const BGM_GENRES = [
  "팝",
  "락",
  "어쿠스틱",
  "재즈",
  "클래식",
  "EDM",
] as const;

export const BGM_GENRE_COLORS = {
  팝: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  락: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  어쿠스틱:
    " bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300",
  재즈: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  클래식: "bg-gray-500 text-gray-100 dark:bg-gray-900 dark:text-gray-300",
  EDM: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
} as const;
