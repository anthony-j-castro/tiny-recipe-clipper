import { useDisclosureStore } from "@ariakit/react/disclosure";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import useGetErrorLog from "~/options/hooks/useGetErrorLog";
import {
  Disclosure,
  DisclosureContent,
  DisclosureContentSeparator,
  DisclosureWrapper,
} from "./styled";

const ICON_OPTIONS = { fontSize: 16, marginRight: "4px", flexGrow: 0 };

const ErrorHistory = () => {
  const { data: errorLog } = useGetErrorLog();
  const [open, setOpen] = useState(false);
  const disclosure = useDisclosureStore({ open, setOpen });

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
        <pre>{JSON.stringify(errorLog)}</pre>
      </DisclosureContent>
    </DisclosureWrapper>
  );
};

export default ErrorHistory;
