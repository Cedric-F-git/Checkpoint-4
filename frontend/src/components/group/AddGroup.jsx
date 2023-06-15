import React, { useState } from "react";
import PropTypes from "prop-types";
import useApi from "../../services/useApi";

function AddGroup({ handleGroupAdded }) {
  const api = useApi();

  const [nameGroup, setNameGroup] = useState("");

  const handleSubmitNewGroup = (e) => {
    e.preventDefault();
    const newGroup = {
      name: nameGroup,
    };

    api
      .post(`/group`, newGroup)
      .then(() => {
        handleGroupAdded(newGroup);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmitNewGroup} className="add-add-group">
        <label htmlFor="label-add-group" className="add-add-group">
          Nom :
          <input
            type="text"
            value={nameGroup}
            onChange={(e) => setNameGroup(e.target.value)}
          />
        </label>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

AddGroup.propTypes = {
  handleGroupAdded: PropTypes.func.isRequired,
};

export default AddGroup;
