import { useDisclosureStore } from "@ariakit/react/disclosure";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ERROR_LOG_MAX_LENGTH, getErrorLog } from "~/utils/error-log";
import {
  Cell,
  Disclaimer,
  Disclosure,
  DisclosureContent,
  DisclosureContentSeparator,
  DisclosureWrapper,
  HeaderCell,
  Table,
} from "./styled";

const ICON_OPTIONS = { fontSize: 16, marginRight: "4px", flexGrow: 0 };

const ErrorHistory = () => {
  const [open, setOpen] = useState(false);
  const disclosure = useDisclosureStore({ open, setOpen });
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

  return (
    <DisclosureWrapper>
      <Disclosure store={disclosure}>
        {open ? (
          <ExpandLessIcon sx={ICON_OPTIONS} />
        ) : (
          <ExpandMoreIcon sx={ICON_OPTIONS} />
        )}
        <span>Error History</span>
      </Disclosure>
      <DisclosureContent store={disclosure}>
        <DisclosureContentSeparator />
        {isPending ? (
          <div>Loading…</div>
        ) : isError ? (
          <div>There was an error.</div>
        ) : errorLog.length === 0 ? (
          <div>There are no errors to display.</div>
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
            <Disclaimer>
              Error history is limited to the last {ERROR_LOG_MAX_LENGTH} items.
            </Disclaimer>
          </>
        )}
      </DisclosureContent>
    </DisclosureWrapper>
  );
};

export default ErrorHistory;
