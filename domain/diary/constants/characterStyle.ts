export const CHARACTER_STYLES = ["로맨스", "디즈니", "히어로"] as const;

export const CHARACTER_STYLE_COLORS = {
  로맨스: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  디즈니:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  히어로: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
};

export const CHARACTER_STYLE_VALUES: { [key: string]: string } = {
  로맨스: "romance",
  디즈니: "pixar",
  히어로: "action",
};
