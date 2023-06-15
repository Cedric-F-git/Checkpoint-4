import React from "react";
import { useLocation } from "react-router-dom";
import CharacterListGroup from "../components/group/CharacterListGroup";

function Group() {
  const { state } = useLocation();

  return (
    <div>
      <h1 className="character-name">{state.selectedName}</h1>
      <CharacterListGroup />
    </div>
  );
}

export default Group;
