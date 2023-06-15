import React from "react";
import { useUser } from "../contexts/UserContext";
import CharacterList from "../components/character/CharacterList";
import GroupList from "../components/group/GroupList";

export default function Home() {
  const { user } = useUser();
  return (
    <main className="main-home-container">
      <h1 className="hello-user">Bonjour {user.pseudo}</h1>
      <div className="home-list-container">
        <CharacterList />
        <GroupList />
      </div>
    </main>
  );
}
