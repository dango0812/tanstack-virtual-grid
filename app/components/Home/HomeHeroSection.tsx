// styles
import styles from "@components/Home/Home.module.scss";
// i18n
import { serverSideTranslation } from "@i18n/server";
// icons
import IconBentoGrid from "@icons/IconBentoGrid";

interface HomeHeroSectionProps {
    lng: string;
}

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
                </div>

                <IconBentoGrid
                    width={360}
                    height={340}
                />
            </div>
        </section>
    );
}