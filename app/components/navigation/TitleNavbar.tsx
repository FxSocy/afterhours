import {
  Alignment,
  Button,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";
import { useNavigate } from "react-router";

export const TitleNavbar = () => {
  const navigate = useNavigate();

  return (
    <Navbar>
      <NavbarGroup
        align={Alignment.START}
        style={{ display: "flex", columnGap: "8px" }}
      >
        <NavbarHeading>Afterhours</NavbarHeading>
        <NavbarDivider />
        <Button
          icon="home"
          variant="minimal"
          intent="primary"
          onClick={() => navigate(``)}
        />
        {/* <Button icon="grid" variant="minimal" intent="primary" onClick={() => navigate(`/grid`)} /> */}
        {/* <Button icon="draw" variant="minimal" intent="primary" onClick={() => navigate(`/sandbox`)} /> */}
        <Button
          icon="graph"
          variant="minimal"
          intent="primary"
          onClick={() => navigate(`/type-calculator`)}
        />
        <Button
          icon="search"
          variant="minimal"
          intent="primary"
          onClick={() => navigate(`/pokemon-search`)}
        />
      </NavbarGroup>
    </Navbar>
  );
};
