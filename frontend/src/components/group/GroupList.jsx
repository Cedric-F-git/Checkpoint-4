import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../../services/useApi";
import AddGroup from "./AddGroup";

function GroupList() {
  const api = useApi();

  const [allGroup, setAllGroup] = useState([]);
  const [showAddGroup, setShowAddGroup] = useState(false);

  useEffect(() => {
    api
      .get(`/group`)
      .then((resp) => {
        setAllGroup(resp.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  const handleNewGroupClick = () => {
    setShowAddGroup(!showAddGroup);
  };

  const handleGroupAdded = (newGroup) => {
    setAllGroup([...allGroup, newGroup]);
    setShowAddGroup(false);
  };

  const handleDeleteGroup = (groupId) => {
    api
      .delete(`/group/${groupId}`)
      .then(() => {
        setAllGroup(allGroup.filter((group) => group.id !== groupId));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h2 className="my-character">Groupe d'aventuriers</h2>
      <button type="button" onClick={handleNewGroupClick}>
        Nouveau groupe
      </button>
      {showAddGroup ? (
        <AddGroup handleGroupAdded={handleGroupAdded} />
      ) : (
        allGroup.map((item) => (
          <div key={item.id}>
            <Link
              className="group-list-content__link"
              to={`/group/${item.id}`}
              state={{ selectedGroupId: item.id }}
            >
              <button type="button">{item.name}</button>
            </Link>
            <button
              type="button"
              className="delete-group"
              onClick={() => handleDeleteGroup(item.id)}
            >
              X
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default GroupList;
