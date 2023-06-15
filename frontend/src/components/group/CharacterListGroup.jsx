import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useApi from "../../services/useApi";

function CharacterListGroup() {
  const api = useApi();
  const { state } = useLocation();

  const [allCharacter, setAllCharacter] = useState([]);
  const [selectedCharacter] = useState({});

  useEffect(() => {
    api
      .get("/character")
      .then((resp) => {
        setAllCharacter(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // const handleCharacterSelect = (event) => {
  //   const selectedCharacterId = event.target.value;
  //   const character = allCharacter.find((c) => c.id == selectedCharacterId);
  //   setSelectedCharacter(character);
  // };

  const handleAddCharacterInGroup = (e) => {
    e.preventDefault();

    const updateCharacterGroupId = {
      ...selectedCharacter,
      characterGroupId: state.selectedGroupId,
    };

    api
      .put(`/character/${selectedCharacter.id}`, updateCharacterGroupId)
      .then()
      .catch((err) => console.error(err));
  };
  // console.log(selectedCharacter);

  return (
    <div>
      <select className="species">
        <option value="">--Choisir un personnage--</option>
        {allCharacter.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <button type="button" onClick={handleAddCharacterInGroup}>
        Ajouter
      </button>
    </div>
  );
}

export default CharacterListGroup;
