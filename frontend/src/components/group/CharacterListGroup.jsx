import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import useApi from "../../services/useApi";

function CharacterListGroup() {
  const api = useApi();
  const { user } = useUser();
  const { state } = useLocation();

  const [allCharacter, setAllCharacter] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState({});

  useEffect(() => {
    api
      .get(`/character/user/${user.id}`)
      .then((resp) => {
        setAllCharacter(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleCharacterSelect = (event) => {
    const selectedCharacterId = event.target.value;
    const character = allCharacter.find(
      // eslint-disable-next-line
      (item) => item.id == selectedCharacterId
    );
    setSelectedCharacter(character);
  };

  const handleAddCharacterInGroup = (e) => {
    e.preventDefault();

    const { userId, ...updatedCharacter } = selectedCharacter;
    const updateCharacterGroupId = state.selectedGroupId;

    api
      .put(`/character/${updatedCharacter.id}`, {
        ...updatedCharacter,
        characterGroupId: updateCharacterGroupId,
      })
      .then(() => {
        setSelectedCharacter((prevCharacter) => ({
          ...prevCharacter,
          characterGroupId: updateCharacterGroupId,
        }));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <select className="species" onChange={handleCharacterSelect}>
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
