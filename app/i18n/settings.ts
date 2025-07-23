export const fallbackLng = "en";
export const languages = [fallbackLng, "ko"];
export const defaultNS = "common";
export const cookieName = "language";

export function getOptions(lng = fallbackLng, ns: string | string[] = defaultNS) {
    return {
        supportedLngs: languages,
        fallbackLng,
        lng,
        fallbackNS: defaultNS,
        defaultNS,
        ns
    };
}