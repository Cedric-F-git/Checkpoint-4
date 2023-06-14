import React, { useEffect, useState } from "react";
import useApi from "../../services/useApi";
import AddCharacter from "./AddCharacter";

function Character() {
  const api = useApi();

  const [allCharacter, setAllCharacter] = useState([]);
  const [showAddCharacter, setShowAddCharacter] = useState(false);

  useEffect(() => {
    api
      .get(`/character`)
      .then((resp) => {
        setAllCharacter(resp.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  const handleNewCharacterClick = () => {
    setShowAddCharacter(!showAddCharacter);
  };

  return (
    <div>
      <h2 className="my-character">Mes personnages</h2>
      <button type="button" onClick={handleNewCharacterClick}>
        Nouveau personnage
      </button>
      {showAddCharacter ? (
        <AddCharacter />
      ) : (
        allCharacter.map((item) => (
          <button type="button" key={item.id}>
            {item.name}
          </button>
        ))
      )}
    </div>
  );
}

export default Character;
