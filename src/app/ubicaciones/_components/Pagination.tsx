"use client";

import React from "react";
import { useLocationsContext } from "./LocationsContext";

export default function Pagination() {
  const { isLoading, page, setPage, pages, error } = useLocationsContext();

  if (error) return;

  return (
    <div className="join mx-auto grid max-w-7xl grid-cols-2">
      <button
        onClick={() => setPage(page - 1)}
        className={`btn btn-outline join-item ${
          (isLoading || page === 1) && "btn-disabled"
        }`}
      >
        Previous page
      </button>

      <button
        onClick={() => setPage(page + 1)}
        className={`btn btn-outline join-item ${
          (isLoading || page === pages) && "btn-disabled"
        }`}
      >
        Next page
      </button>
    </div>
  );
}
