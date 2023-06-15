import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useApi from "../../services/useApi";

function CharacterInfosGroup({ selectedCharacter }) {
  const api = useApi();

  const [inventoryDetail, setInventoryDetail] = useState({});

  useEffect(() => {
    if (selectedCharacter.inventoryId) {
      api
        .get(`/inventory/${selectedCharacter.inventoryId}`)
        .then((resp) => {
          setInventoryDetail(resp.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [selectedCharacter.inventoryId]);

  return (
    <div>
      <h2 className="group-character-name">{selectedCharacter.name}</h2>
      <section className="group-section-infos">
        <article className="group-character-infos">
          <h4 className="character-infos-classe">
            Classe : {selectedCharacter.classe}
          </h4>
          <h4 className="character-infos-species">
            Espèce : {selectedCharacter.species}
          </h4>
          <h4 className="character-infos-lifepoint">
            Points de Vie : {selectedCharacter.lifepoint}
          </h4>
          <h4 className="character-infos-stamina">
            Endurance : {selectedCharacter.stamina}
          </h4>
          <h4 className="character-infos-hope">
            Espoir : {selectedCharacter.hope}
          </h4>
          <h4 className="character-infos-money">
            Couronnes : {selectedCharacter.money}
          </h4>
        </article>

        <article className="group-character-equipment">
          <h3 className="equipment-title">
            Arme : <p className="equipment-p">{selectedCharacter.weapon}</p>
          </h3>
          <h3 className="equipment-title">
            Armure : <p className="equipment-p">{selectedCharacter.armor}</p>
          </h3>
        </article>

        <article className="group-character-skills">
          <div className="skills-container">
            <h3 className="skills-title">Physique :</h3>
            <p className="skills-number">{selectedCharacter.physical}</p>
          </div>
          <div className="skills-container">
            <h3 className="skills-title">Social :</h3>
            <p className="skills-number">{selectedCharacter.social}</p>
          </div>
          <div className="skills-container">
            <h3 className="skills-title">Intelligence :</h3>
            <p className="skills-number">{selectedCharacter.intelligence}</p>
          </div>
        </article>

        <article className="group-character-inventory">
          <h3 className="inventory-title">Inventaire :</h3>
          <p className="inventory-p">Potion : {inventoryDetail.potion}</p>
          <p className="inventory-p">Ration : {inventoryDetail.ration}</p>
          <p className="inventory-p">Bandage : {inventoryDetail.bandage}</p>
          <p className="inventory-p">Torche : {inventoryDetail.torch}</p>
        </article>
      </section>
    </div>
  );
}

CharacterInfosGroup.propTypes = {
  selectedCharacter: PropTypes.func.isRequired,
};

export default CharacterInfosGroup;
