import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import HorizontalSeparator from "~/options/components/HorizontalSeparator";
import ChevronDownIcon from "~/ui-shared/components/icons/ChevronDownIcon";
import ChevronUpIcon from "~/ui-shared/components/icons/ChevronUpIcon";
import ErrorIcon from "~/ui-shared/components/icons/ErrorIcon";
import InfoIcon from "~/ui-shared/components/icons/InfoIcon";
import { ERROR_LOG_MAX_LENGTH, getErrorLog } from "~/utils/error-log";
import getReportProblemFormUrl from "~/utils/getReportProblemFormUrl";
import styles from "./style.module.css";

const ErrorHistory = () => {
  const [open, setOpen] = useState(false);
  const {
    data: errorLog,
    isError,
    isPending,
  } = useQuery({
    enabled: open,
    queryKey: ["errorLog"],
    queryFn: async () => getErrorLog(),
    refetchOnWindowFocus: true,
  });

  const reportProblemFormUrl = getReportProblemFormUrl();

  return (
    <details
      className={styles.disclosureWrapper}
      {...(open ? { open: true } : {})}
    >
      <summary
        className={styles.disclosure}
        onClick={(event) => {
          event.preventDefault();
          setOpen((open) => !open);
        }}
      >
        {open ? (
          <ChevronUpIcon className={styles.icon} />
        ) : (
          <ChevronDownIcon className={styles.icon} />
        )}
        <span>Error History</span>
      </summary>
      <div>
        <HorizontalSeparator className={styles.disclosureContentSeparator} />
        {isPending ? (
          <div className={styles.iconMessageWrapper}>Loading…</div>
        ) : isError ? (
          <div className={styles.iconMessageWrapper}>
            <ErrorIcon className={styles.icon} />
            <span>
              Something went wrong while loading your error history. Please{" "}
              <a
                href={reportProblemFormUrl}
                rel="noreferrer"
                target="_blank"
              >
                report this problem
              </a>
              .
            </span>
          </div>
        ) : errorLog.length === 0 ? (
          <div className={styles.iconMessageWrapper}>
            <InfoIcon className={styles.icon} />
            <span>There are no recent errors to display.</span>
          </div>
        ) : (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.headerCell}>Date</th>
                  <th className={styles.headerCell}>Time</th>
                  <th className={styles.headerCell}>Type</th>
                  <th className={styles.headerCell}>Message</th>
                  <th className={styles.headerCell}>Additional data</th>
                </tr>
              </thead>
              <tbody>
                {errorLog.map((entry) => {
                  const date = new Date(entry.timestamp);

                  return (
                    <tr key={entry.uuid}>
                      <td className={styles.cell}>
                        {date.toLocaleDateString()}
                      </td>
                      <td className={styles.cell}>
                        {date.toLocaleTimeString()}
                      </td>
                      <td className={styles.cell}>{entry.level}</td>
                      <td className={styles.cell}>{entry.message}</td>
                      <td className={styles.cell}>
                        {JSON.stringify(entry.properties)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.iconMessageWrapper}>
              <InfoIcon className={styles.icon} />
              <span>
                Error history is limited to the last {ERROR_LOG_MAX_LENGTH}{" "}
                items.
              </span>
            </div>
          </>
        )}
      </div>
    </details>
  );
};

export default ErrorHistory;
