import {
  Alignment,
  Button,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { switchGeneration, useGeneration } from "~/redux/slices/searchSlice";
import { PokemonGeneration } from "../pokemon/PokemonTypes";

export const TitleNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gen = useGeneration();

  //TODO: change it to a selector or something else if more than 2 types of gen are supported
  const handleSwitchGen = () => {
    dispatch(
      switchGeneration(
        gen === PokemonGeneration.MODERN
          ? PokemonGeneration.GEN4
          : PokemonGeneration.MODERN
      )
    );
  };

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
        {/* <Button
          icon="playbook"
          variant="minimal"
          intent="primary"
          onClick={() => navigate(`/omnisearch`)}
        /> */}
      </NavbarGroup>
      <NavbarGroup align={Alignment.END}>
        <Button
          title="switch data source"
          icon="lab-test"
          text={gen}
          variant="minimal"
          intent="primary"
          onClick={handleSwitchGen}
        />
      </NavbarGroup>
    </Navbar>
  );
};
