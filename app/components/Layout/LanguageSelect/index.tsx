// next
import Link from "next/link";
// styles
import styles from "@components/Layout/LanguageSelect/LanguageSelect.module.scss";
// icons
import IconWorld from "@icons/IconWorld";
import IconKorean from "@icons/IconKorean";

const LANGUAGE_CONFIG = [
    { lang: "en", path: "/en/", icon: <IconWorld /> },
    { lang: "ko", path: "/ko/", icon: <IconKorean /> }
];

interface LanguageSelectProps {
    lng: string;
}

export default function LanguageSelect({
    lng
}: LanguageSelectProps) {
    return (
        <>
            {LANGUAGE_CONFIG.filter((config) => config.lang !== lng).map(({ lang, path, icon }) => (
                <Link
                    key={lang}
                    href={path}
                    aria-label={`Switch to ${lang}`}
                    prefetch
                    className={styles.languageSelect}
                >
                    <span>
                        {icon}
                    </span>
                </Link>
            ))}
        </>
    );
}