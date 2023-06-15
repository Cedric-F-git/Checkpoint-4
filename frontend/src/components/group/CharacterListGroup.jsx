import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useApi from "../../services/useApi";

function CharacterListGroup() {
  const api = useApi();
  const { state } = useLocation();

  const [allCharacter, setAllCharacter] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState({});
  const [groupCharacters, setGroupCharacters] = useState([]);
  const [availableCharacters, setAvailableCharacters] = useState([]);

  useEffect(() => {
    api
      .get(`/character`)
      .then((resp) => {
        setAllCharacter(resp.data.sort((a, b) => a.name.localeCompare(b.name)));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (state && state.selectedGroupId) {
      const charactersInGroup = allCharacter.filter(
        (character) => character.characterGroupId === state.selectedGroupId
      );

      setGroupCharacters(charactersInGroup);
    }
  }, [allCharacter, state.selectedGroupId]);

  useEffect(() => {
    const filteredAvailableCharacters = allCharacter.filter(
      (character) =>
        character.characterGroupId === null &&
        !groupCharacters.find((c) => c.id === character.id)
    );

    setAvailableCharacters(filteredAvailableCharacters);
  }, [allCharacter, groupCharacters]);

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
    const updatedGroupCharacters = [...groupCharacters, selectedCharacter];

    updatedGroupCharacters.sort((a, b) => a.name.localeCompare(b.name));

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
        setGroupCharacters(updatedGroupCharacters);
      })
      .catch((err) => console.error(err));
  };

  const handleRemoveCharacterFromGroup = (characterId) => {
    const characterToRemove = groupCharacters.find(
      (character) => character.id === characterId
    );

    if (characterToRemove) {
      api
        .put(`/character/${characterId}`, {
          ...characterToRemove,
          characterGroupId: null,
        })
        .then(() => {
          setGroupCharacters((prevGroupCharacters) =>
            prevGroupCharacters.filter(
              (character) => character.id !== characterId
            )
          );
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <select className="list-group" onChange={handleCharacterSelect}>
        <option value="">--Choisir un personnage--</option>
        {availableCharacters.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <button type="button" onClick={handleAddCharacterInGroup}>
        Ajouter
      </button>

      <div className="list-group-character">
        {groupCharacters.map((item) => (
          <div key={item.id}>
            <button type="button" className="list-group-character-btn">
              {item.name}
            </button>
            <button
              type="button"
              className="delete-character"
              onClick={() => handleRemoveCharacterFromGroup(item.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharacterListGroup;
