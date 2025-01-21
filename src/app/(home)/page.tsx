import React from "react";
import { CharactersProvider } from "./_components/CharactersContext";
import CharacterList from "./_components/CharactersList";
import Pagination from "./_components/Pagination";
import Filters from "./_components/Filters";

export default async function Home() {
  return (
    <CharactersProvider>
      <main className="space-y-4 p-4">
        <Filters />
        <CharacterList />
        <Pagination />
      </main>
    </CharactersProvider>
  );
}
