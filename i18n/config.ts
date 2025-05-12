export type Locale = (typeof locales)[number];

export const locales = ["en", "tk", "ru"] as const;
export const defaultLocale: Locale = "tk";
