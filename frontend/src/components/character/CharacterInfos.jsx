import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../services/useApi";

function CharacterInfos() {
  const api = useApi();
  const { id } = useParams();
  const [characterDetail, setCharacterDetail] = useState({});
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

  return (
    <section className="character-section">
      <h1 className="character-name">{characterDetail.name}</h1>

      <aside className="story-container">
        <h5 className="story-title">Histoire :</h5>
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
          <div className="skills-container">
            <h3 className="skills-title">Physique :</h3>
            <p className="skills-number">{characterDetail.physical}</p>
          </div>
          <div className="skills-container">
            <h3 className="skills-title">Social :</h3>
            <p className="skills-number">{characterDetail.social}</p>
          </div>
          <div className="skills-container">
            <h3 className="skills-title">Intelligence :</h3>
            <p className="skills-number">{characterDetail.intelligence}</p>
          </div>
        </aside>
      </article>

      <aside className="equipment-container">
        <h3 className="equipment-title">
          Arme : <p className="equipment-p">{characterDetail.weapon}</p>
        </h3>
        <h3 className="equipment-title">
          Armure : <p className="equipment-p">{characterDetail.armor}</p>
        </h3>
      </aside>

      <aside className="inventory-container">
        <h3 className="inventory-title">Inventaire :</h3>
        <p className="inventory-p">Potion : {inventoryDetail.potion}</p>
        <p className="inventory-p">Ration : {inventoryDetail.ration}</p>
        <p className="inventory-p">Bandage : {inventoryDetail.bandage}</p>
        <p className="inventory-p">Torche : {inventoryDetail.torch}</p>
      </aside>
    </section>
  );
}

export default CharacterInfos;
