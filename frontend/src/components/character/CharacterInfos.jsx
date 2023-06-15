import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../services/useApi";
import EditCharacter from "./EditCharacter";

function CharacterInfos() {
  const api = useApi();
  const { id } = useParams();
  const [characterDetail, setCharacterDetail] = useState({});
  const [editing, setEditing] = useState(false);
  const [inventoryDetail, setInventoryDetail] = useState({});

  useEffect(() => {
    api
      .get(`/character/${id}`)
      .then((resp) => {
        setCharacterDetail(resp.data);
        return api.get(`/inventory/${resp.data.inventoryId}`);
      })
      .then((resp) => {
        setInventoryDetail(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleEditCharacterClick = () => {
    setEditing(true);
  };

  if (editing) {
    return (
      <EditCharacter
        characterDetail={characterDetail}
        setCharacterDetail={setCharacterDetail}
        setEditing={setEditing}
      />
    );
  }

  return (
    <section className="character-section">
      <h1 className="character-name">{characterDetail.name}</h1>

      <button
        className="edit-character"
        type="button"
        onClick={handleEditCharacterClick}
      >
        Modifier
      </button>

      <article className="article-character-infos-container">
        <aside className="story-container">
          <h4 className="story-title">Histoire :</h4>
          <p className="story-p">{characterDetail.story}</p>
        </aside>

        <article className="infos-skills">
          <aside className="character-infos-container">
            <h4 className="character-infos-classe">
              Classe : {characterDetail.classe}
            </h4>
            <h4 className="character-infos-species">
              Espèce : {characterDetail.species}
            </h4>
            <h4 className="character-infos-lifepoint">
              Points de Vie : {characterDetail.lifepoint}
            </h4>
            <h4 className="character-infos-stamina">
              Endurance : {characterDetail.stamina}
            </h4>
            <h4 className="character-infos-hope">
              Espoir : {characterDetail.hope}
            </h4>
            <h4 className="character-infos-money">
              Couronnes : {characterDetail.money}
            </h4>
          </aside>
          <aside className="skills">
            <div className="skills-container" id="physical">
              <h4 className="skills-title">Physique :</h4>
              <p className="skills-number">{characterDetail.physical}</p>
            </div>
            <div className="skills-container" id="social">
              <h4 className="skills-title">Social :</h4>
              <p className="skills-number">{characterDetail.social}</p>
            </div>
            <div className="skills-container" id="intelligence">
              <h4 className="skills-title">Intelligence :</h4>
              <p className="skills-number">{characterDetail.intelligence}</p>
            </div>
          </aside>
        </article>

        <aside className="equipment-container">
          <h4 className="equipment-title">
            Arme : <p className="equipment-p">{characterDetail.weapon}</p>
          </h4>
          <h4 className="equipment-title">
            Armure : <p className="equipment-p">{characterDetail.armor}</p>
          </h4>
        </aside>

        <aside className="inventory-container">
          <h4 className="inventory-title">Inventaire :</h4>
          <p className="inventory-p">Potion : {inventoryDetail.potion}</p>
          <p className="inventory-p">Ration : {inventoryDetail.ration}</p>
          <p className="inventory-p">Bandage : {inventoryDetail.bandage}</p>
          <p className="inventory-p">Torche : {inventoryDetail.torch}</p>
        </aside>
      </article>
    </section>
  );
}

export default CharacterInfos;
