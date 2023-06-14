import React, { useEffect, useState } from "react";
import useApi from "../../services/useApi";

function AddCharacter() {
  const api = useApi();

  const [inventory, setInventory] = useState([]);

  const [nameChar, setNameChar] = useState("");
  const [classeChar, setClassChar] = useState("");
  const [species, setSpecies] = useState("");
  const [lifepoint, setLifepoint] = useState(0);
  const [stamina, setStamina] = useState(0);
  const [hope, setHope] = useState(0);
  const [money, setMoney] = useState(0);
  const [physical, setPhysical] = useState(0);
  const [social, setSocial] = useState(0);
  const [intelligence, setIntelligence] = useState(0);
  const [weapon, setWeapon] = useState("");
  const [armor, setArmor] = useState("");
  const [story, setStory] = useState("");
  const [characterUserId] = useState(1);
  const [inventoryId, setInventoryId] = useState("");
  const [characterGroupId] = useState(1);

  useEffect(() => {
    api
      .get("/inventory")
      .then((resp) => {
        setInventory(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSubmitNewCharacter = (e) => {
    e.preventDefault();
    const newCharacter = {
      name: nameChar,
      classe: classeChar,
      species,
      lifepoint,
      stamina,
      hope,
      money,
      physical,
      social,
      intelligence,
      weapon,
      armor,
      story,
      characterUserId,
      inventoryId,
      characterGroupId,
    };
    api
      .post(`/character`, newCharacter)
      .then()
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmitNewCharacter} className="form-add-character">
        <label htmlFor="label-add-character" className="label-add-character">
          Nom :
          <input
            type="text"
            value={nameChar}
            onChange={(e) => setNameChar(e.target.value)}
          />
        </label>
        <label htmlFor="classe-character" className="label-add-character">
          Classe :
          <select
            className="classe-character"
            value={classeChar}
            onChange={(e) => setClassChar(e.target.value)}
          >
            <option value="">--Choisir une classe--</option>
            <option value="Guerrier">Guerrier</option>
            <option value="Chasseur">Chasseur</option>
            <option value="Voleur">Voleur</option>
            <option value="Mage">Mage</option>
            <option value="Druide">Druide</option>
          </select>
        </label>
        <label htmlFor="species" className="label-add-character">
          Espèce :
          <select
            className="species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          >
            <option value="">--Choisir une espèce--</option>
            <option value="Humain">Humain</option>
            <option value="Elfe">Elfe</option>
            <option value="Nain">Nain</option>
            <option value="Halfelin">Halfelin</option>
          </select>
        </label>
        <label htmlFor="label-add-character" className="label-add-character">
          Points de Vie :
          <input
            className="life-point"
            type="number"
            value={lifepoint}
            onChange={(e) => setLifepoint(e.target.value)}
          />
        </label>
        <label htmlFor="label-add-character" className="label-add-character">
          Endurance :
          <input
            className="stamina"
            type="number"
            value={stamina}
            onChange={(e) => setStamina(e.target.value)}
          />
        </label>
        <label htmlFor="label-add-character" className="label-add-character">
          Espoir :
          <input
            className="hope"
            type="number"
            value={hope}
            onChange={(e) => setHope(e.target.value)}
          />
        </label>
        <label htmlFor="label-add-character" className="label-add-character">
          Couronnes :
          <input
            className="money"
            type="number"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
          />
        </label>
        <label htmlFor="label-add-character" className="label-add-character">
          Physique :
          <input
            className="physical"
            type="number"
            value={physical}
            onChange={(e) => setPhysical(e.target.value)}
          />
        </label>
        <label htmlFor="label-add-character" className="label-add-character">
          Social :
          <input
            className="social"
            type="number"
            value={social}
            onChange={(e) => setSocial(e.target.value)}
          />
        </label>{" "}
        <label htmlFor="label-add-character" className="label-add-character">
          Intelligence :
          <input
            className="intelligence"
            type="number"
            value={intelligence}
            onChange={(e) => setIntelligence(e.target.value)}
          />
        </label>{" "}
        <label htmlFor="label-add-character" className="label-add-character">
          Arme :
          <input
            className="weapon"
            type="text"
            value={weapon}
            onChange={(e) => setWeapon(e.target.value)}
          />
        </label>{" "}
        <label htmlFor="label-add-character" className="label-add-character">
          Armure :
          <input
            className="armor"
            type="text"
            value={armor}
            onChange={(e) => setArmor(e.target.value)}
          />
        </label>{" "}
        <label htmlFor="label-add-character" className="label-add-character">
          Histoire :
          <input
            className="story"
            type="text"
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />
        </label>{" "}
        <label htmlFor="inventory" className="label-add-character">
          Inventaire :
          <select
            className="species"
            value={inventoryId}
            onChange={(e) => setInventoryId(e.target.value)}
          >
            <option value="">--Choisir un inventaire--</option>
            {inventory.map((option) => (
              <option key={option.id} value={option.id}>
                Choix : {option.id}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddCharacter;
