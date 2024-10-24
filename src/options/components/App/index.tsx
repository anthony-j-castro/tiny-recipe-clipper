import { Information as InformationIcon } from "mdi-material-ui";
import config from "~/config";
import useGetUserId from "~/hooks/useGetUserId";
import ErrorHistory from "~/options/components/ErrorHistory";
import logo from "~/options/images/logo.svg";
import getReportProblemFormUrl from "~/utils/getReportProblemFormUrl";
import {
  BannerButton,
  BannerCopy,
  Container,
  DescriptionParagraph,
  Header,
  InfoBanner,
  InnerBannerContainer,
  Label,
  Logo,
  Main,
  SectionHeading,
  Separator,
  Title,
  UserId,
  VersionInformation,
  VersionNumber,
} from "./styled";

export default function App() {
  const { data: userId, isPending } = useGetUserId();

  const reportProblemFormUrl = getReportProblemFormUrl();

  return (
    <Container>
      <Header>
        <Logo
          draggable={false}
          src={logo}
        />
        <Title>Tiny Recipe Clipper Options</Title>
      </Header>
      <Main>
        {!isPending && userId === undefined ? (
          <InfoBanner>
            <InnerBannerContainer>
              <InformationIcon sx={{ display: "block", fontSize: 20 }} />
              <BannerCopy>
                <div>
                  Finish setting up this extension by syncing with the web app.
                </div>
                <BannerButton
                  href={`${config.WEB_APP.ORIGIN}${config.WEB_APP.BROWSER_EXTENSION_PATH}`}
                >
                  Launch Tiny Recipe Box in a new tab
                </BannerButton>
              </BannerCopy>
            </InnerBannerContainer>
          </InfoBanner>
        ) : null}
        <section>
          <Label>
            User ID:{" "}
            {isPending ? (
              <UserId>Loading…</UserId>
            ) : userId === undefined ? (
              <span>Not yet synced</span>
            ) : (
              <UserId>{userId}</UserId>
            )}
          </Label>
          <DescriptionParagraph>
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
          </DescriptionParagraph>
        </section>
        <Separator />
        <section>
          <SectionHeading>Help</SectionHeading>
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
        <Separator />
        <section>
          <SectionHeading>About</SectionHeading>
          <VersionInformation>
            Extension version: <VersionNumber>{config.VERSION}</VersionNumber>
          </VersionInformation>
        </section>
      </Main>
    </Container>
  );
}
