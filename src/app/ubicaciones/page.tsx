import React from "react";
import { LocationsProvider } from "./_components/LocationsContext";
import LocationsList from "./_components/LocationsList";
import Pagination from "./_components/Pagination";

export default function page() {
  return (
    <LocationsProvider>
      <main className="space-y-4 p-4">
        <LocationsList />
        <Pagination />
      </main>
    </LocationsProvider>
  );
}
