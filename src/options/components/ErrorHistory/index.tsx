import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ERROR_LOG_MAX_LENGTH, getErrorLog } from "~/utils/error-log";
import getReportProblemFormUrl from "~/utils/getReportProblemFormUrl";
import {
  Cell,
  ChevronDownIcon,
  ChevronUpIcon,
  Disclosure,
  DisclosureContentSeparator,
  DisclosureWrapper,
  ErrorIcon,
  HeaderCell,
  IconWithMessageWrapper,
  InfoIcon,
  Table,
} from "./styled";

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
    <DisclosureWrapper {...(open ? { open: true } : {})}>
      <Disclosure
        onClick={(event) => {
          event.preventDefault();
          setOpen((open) => !open);
        }}
      >
        {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
        <span>Error History</span>
      </Disclosure>
      <div>
        <DisclosureContentSeparator />
        {isPending ? (
          <IconWithMessageWrapper>Loading…</IconWithMessageWrapper>
        ) : isError ? (
          <IconWithMessageWrapper>
            <ErrorIcon />
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
          </IconWithMessageWrapper>
        ) : errorLog.length === 0 ? (
          <IconWithMessageWrapper>
            <InfoIcon />
            <span>There are no recent errors to display.</span>
          </IconWithMessageWrapper>
        ) : (
          <>
            <Table>
              <thead>
                <tr>
                  <HeaderCell>Date</HeaderCell>
                  <HeaderCell>Time</HeaderCell>
                  <HeaderCell>Type</HeaderCell>
                  <HeaderCell>Message</HeaderCell>
                  <HeaderCell>Additional data</HeaderCell>
                </tr>
              </thead>
              <tbody>
                {errorLog.map((entry) => {
                  const date = new Date(entry.timestamp);

                  return (
                    <tr key={entry.uuid}>
                      <Cell>{date.toLocaleDateString()}</Cell>
                      <Cell>{date.toLocaleTimeString()}</Cell>
                      <Cell>{entry.level}</Cell>
                      <Cell>{entry.message}</Cell>
                      <Cell>{JSON.stringify(entry.properties)}</Cell>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <IconWithMessageWrapper>
              <InfoIcon />
              <span>
                Error history is limited to the last {ERROR_LOG_MAX_LENGTH}{" "}
                items.
              </span>
            </IconWithMessageWrapper>
          </>
        )}
      </div>
    </DisclosureWrapper>
  );
};

export default ErrorHistory;
