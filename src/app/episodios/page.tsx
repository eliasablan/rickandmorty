import React from "react";
import { EpisodesProvider } from "./_components/EpisodesContext";
import EpisodesList from "./_components/EpisodesList";
import Pagination from "./_components/Pagination";

export default function page() {
  return (
    <EpisodesProvider>
      <main className="space-y-4 p-4">
        <EpisodesList />
        <Pagination />
      </main>
    </EpisodesProvider>
  );
}
