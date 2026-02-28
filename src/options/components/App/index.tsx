import config from "~/config";
import useGetUserId from "~/hooks/useGetUserId";
import ErrorHistory from "~/options/components/ErrorHistory";
import HorizontalSeparator from "~/options/components/HorizontalSeparator";
import logo from "~/options/images/logo.svg";
import InfoIcon from "~/ui-shared/components/icons/InfoIcon";
import LinkPrimaryButton from "~/ui-shared/components/LinkPrimaryButton";
import getReportProblemFormUrl from "~/utils/getReportProblemFormUrl";
import styles from "./style.module.css";

export default function App() {
  const { data: userId, isPending } = useGetUserId();

  const reportProblemFormUrl = getReportProblemFormUrl();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img
          className={styles.logo}
          draggable={false}
          src={logo}
        />
        <h1 className={styles.title}>Tiny Recipe Clipper Options</h1>
      </header>
      <main className={styles.main}>
        {!isPending && userId === undefined ? (
          <div className={styles.infoBanner}>
            <div className={styles.infoBannerContainer}>
              <InfoIcon className={styles.infoIcon} />
              <div className={styles.bannerCopy}>
                <div>
                  Finish setting up this extension by syncing with the web app.
                </div>
                <LinkPrimaryButton
                  className={styles.bannerButton}
                  href={`${config.WEB_APP.ORIGIN}${config.WEB_APP.BROWSER_EXTENSION_PATH}`}
                >
                  Launch Tiny Recipe Box in a new tab
                </LinkPrimaryButton>
              </div>
            </div>
          </div>
        ) : null}
        <section>
          <span className={styles.label}>
            User ID:{" "}
            {isPending ? (
              <span className={styles.userId}>Loading…</span>
            ) : userId === undefined ? (
              <span>Not yet synced</span>
            ) : (
              <span className={styles.userId}>{userId}</span>
            )}
          </span>
          <p className={styles.description}>
            Your user ID is synced from the Tiny Recipe Box web app. Learn more
            about how this ID is used by visiting the{" "}
            <a
              href={`${config.WEB_APP.ORIGIN}${config.WEB_APP.SETTINGS_PATH}`}
              rel="noreferrer"
              target="_blank"
            >
              web app settings page
            </a>
            .
          </p>
        </section>
        <HorizontalSeparator className={styles.separator} />
        <section>
          <h2 className={styles.sectionHeading}>Help</h2>
          <div>
            <a
              href={reportProblemFormUrl}
              rel="noreferrer"
              target="_blank"
            >
              Report a problem…
            </a>
          </div>
          <ErrorHistory />
        </section>
        <HorizontalSeparator className={styles.separator} />
        <section>
          <h2 className={styles.sectionHeading}>About</h2>
          <div className={styles.version}>
            Extension version:{" "}
            <span className={styles.versionNumber}>{config.VERSION}</span>
            rollbar: {config.ROLLBAR_ACCESS_TOKEN}
          </div>
        </section>
      </main>
    </div>
  );
}
