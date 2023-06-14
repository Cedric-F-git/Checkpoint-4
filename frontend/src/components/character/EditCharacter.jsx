import React, { useState } from "react";
import PropTypes from "prop-types";
import useApi from "../../services/useApi";

function EditCharacter({ characterDetail, setCharacterDetail, setEditing }) {
  const api = useApi();

  const [characterId] = useState(characterDetail.id);
  const [story, setStory] = useState(characterDetail.story);
  const [classeChar, setClassChar] = useState(characterDetail.classe);
  const [species, setSpecies] = useState(characterDetail.species);
  const [lifepoint, setLifepoint] = useState(characterDetail.lifepoint);
  const [stamina, setStamina] = useState(characterDetail.stamina);
  const [hope, setHope] = useState(characterDetail.hope);
  const [money, setMoney] = useState(characterDetail.money);
  const [physical, setPhysical] = useState(characterDetail.physical);
  const [social, setSocial] = useState(characterDetail.social);
  const [intelligence, setIntelligence] = useState(
    characterDetail.intelligence
  );
  const [weapon, setWeapon] = useState(characterDetail.weapon);
  const [armor, setArmor] = useState(characterDetail.armor);

  const handleUpdateCharacter = (e) => {
    e.preventDefault();

    const updatedCharacter = {
      ...characterDetail,
      story,
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
    };

    api
      .put(`/character/${characterId}`, updatedCharacter)
      .then(() => {
        setCharacterDetail(updatedCharacter);
        setEditing(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <section className="edit-form-character">
      <h1>Modifier {characterDetail.name}</h1>
      <form
        htmlFor="classe-character"
        className="form-add-character"
        onSubmit={handleUpdateCharacter}
      >
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
        <button type="submit">Modifier</button>
      </form>
    </section>
  );
}

EditCharacter.propTypes = {
  characterDetail: PropTypes.func.isRequired,
  setCharacterDetail: PropTypes.func.isRequired,
  setEditing: PropTypes.bool.isRequired,
};

export default EditCharacter;
