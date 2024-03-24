import config from "~/config";
import useGetUserId from "~/hooks/useGetUserId";
import manifest from "~/manifest.json";
import logo from "~/options/images/logo.svg";
import {
  Container,
  DescriptionParagraph,
  Header,
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
  const { data: userId } = useGetUserId();

  const reportProblemFormUrl = new URL(config.REPORT_PROBLEM_FORM.URL);
  reportProblemFormUrl.searchParams.set(
    config.REPORT_PROBLEM_FORM.VERSION_LINK_PARAM,
    manifest.version,
  );

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
        <section>
          <Label>
            User ID: <UserId>{userId}</UserId>
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
              href={reportProblemFormUrl.toString()}
              rel="noreferrer"
              target="_blank"
            >
              Report a problem…
            </a>
          </div>
        </section>
        <Separator />
        <section>
          <SectionHeading>About</SectionHeading>
          <VersionInformation>
            Extension version: <VersionNumber>{manifest.version}</VersionNumber>
          </VersionInformation>
        </section>
      </Main>
    </Container>
  );
}
