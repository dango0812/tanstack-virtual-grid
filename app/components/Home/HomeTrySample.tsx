// styles
import styles from "@components/Home/Home.module.scss";
// i18n
import { serverSideTranslation } from "@i18n/server";
// components
import HorizontalResizer from "@components/Layout/HorizontalResizer";
import SampleVirtualGrid from "@/components/Sample/SampleVirtualGrid";

interface HomeTrySampleProps {
    lng: string;
}

export default async function HomeTrySample({
    lng
}: HomeTrySampleProps) {
    const { t } = await serverSideTranslation(lng);

    return (
        <section className={styles.trySampleSection}>
            <div className={styles.wrapper}>
                <h2>
                    {t("home_try_sample_section.title")}
                </h2>
                <p>
                    {t("home_try_sample_section.description")}
                </p>

                <HorizontalResizer
                    height={600}
                >
                    <SampleVirtualGrid />
                </HorizontalResizer>
            </div>
        </section>
    );
}
