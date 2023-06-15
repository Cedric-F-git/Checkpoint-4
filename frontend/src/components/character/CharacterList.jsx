import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import useApi from "../../services/useApi";
import AddCharacter from "./AddCharacter";

function CharacterList() {
  const api = useApi();
  const { user } = useUser();

  const [allCharacter, setAllCharacter] = useState([]);
  const [showAddCharacter, setShowAddCharacter] = useState(false);

  useEffect(() => {
    api
      .get(`/character/user/${user.id}`)
      .then((resp) => {
        setAllCharacter(resp.data.sort((a, b) => a.name.localeCompare(b.name)));
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  const handleNewCharacterClick = () => {
    setShowAddCharacter(!showAddCharacter);
  };

  const handleCharacterAdded = (newCharacter) => {
    setAllCharacter([...allCharacter, newCharacter]);
    setShowAddCharacter(false);
  };

  const handleDeleteCharacter = (characterId) => {
    api
      .delete(`/character/${characterId}`)
      .then(() => {
        setAllCharacter(
          allCharacter.filter((character) => character.id !== characterId)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h2 className="my-character">Mes personnages</h2>
      <button type="button" onClick={handleNewCharacterClick}>
        Nouveau personnage
      </button>
      {showAddCharacter ? (
        <AddCharacter handleCharacterAdded={handleCharacterAdded} />
      ) : (
        allCharacter.map((item) => (
          <div key={item.id}>
            <Link
              className="idea-list-content__link"
              to={`/character/${item.id}`}
            >
              <button type="button">{item.name}</button>
            </Link>
            <button
              type="button"
              className="delete-character"
              onClick={() => handleDeleteCharacter(item.id)}
            >
              X
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default CharacterList;
