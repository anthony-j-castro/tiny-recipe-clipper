import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle as AlertIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
  Information as InformationIcon,
} from "mdi-material-ui";
import { useState } from "react";
import { ERROR_LOG_MAX_LENGTH, getErrorLog } from "~/utils/error-log";
import getReportProblemFormUrl from "~/utils/getReportProblemFormUrl";
import {
  Cell,
  Disclosure,
  DisclosureContentSeparator,
  DisclosureWrapper,
  HeaderCell,
  IconWithMessageWrapper,
  Table,
} from "./styled";

const ICON_OPTIONS = { fontSize: 16, marginRight: "4px", flexGrow: 0 };

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
        {open ? (
          <ChevronUpIcon sx={ICON_OPTIONS} />
        ) : (
          <ChevronDownIcon sx={ICON_OPTIONS} />
        )}
        <span>Error History</span>
      </Disclosure>
      <div>
        <DisclosureContentSeparator />
        {isPending ? (
          <IconWithMessageWrapper>Loading…</IconWithMessageWrapper>
        ) : isError ? (
          <IconWithMessageWrapper>
            <AlertIcon sx={ICON_OPTIONS} />
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
            <InformationIcon sx={ICON_OPTIONS} />
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
              <InformationIcon sx={ICON_OPTIONS} />
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
