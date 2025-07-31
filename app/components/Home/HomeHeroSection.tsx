// next
import Link from "next/link";
// styles
import styles from "@components/Home/Home.module.scss";
// i18n
import { serverSideTranslation } from "@i18n/server";
// icons
import IconGithub from "@icons/IconGithub";
import IconBentoGrid from "@icons/IconBentoGrid";
// paths
import { domains } from "@lib/paths";

interface HomeHeroSectionProps {
    lng: string;
}

const linkConfig = [
    { href: domains.github, label: "Github", icon: <IconGithub /> }
];

export default async function HomeHeroSection({
    lng
}: HomeHeroSectionProps) {
    const { t } = await serverSideTranslation(lng);

    return (
        <section className={styles.heroSection}>
            <div className={styles.wrapper}>
                <div className={styles.titleArea}>
                    <h1>
                        {t("hero_section.title")}
                        <span>
                            {t("hero_section.title2")}
                        </span>
                    </h1>

                    <p>
                        {t("hero_section.description")}
                    </p>
                    
                    {linkConfig.map(({ href, label, icon }) => (
                        <Link
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {icon}

                            <span>
                                {label}
                            </span>
                        </Link>
                    ))}
                </div>

                <IconBentoGrid
                    width={360}
                    height={340}
                />
            </div>
        </section>
    );
}