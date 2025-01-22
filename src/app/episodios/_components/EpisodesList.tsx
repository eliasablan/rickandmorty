"use client";

import React, { useState } from "react";
import { Episode, useEpisodesContext } from "./EpisodesContext";

export default function EpisodesList() {
  const { isLoading, data, error } = useEpisodesContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center">
        <p>Cargando...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex w-full items-center justify-center">
        <p>{error}</p>
      </div>
    );

  const openModal = (episode: Episode) => {
    setSelectedEpisode(episode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEpisode(null);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {data.map((episode) => (
        <div
          className="card border bg-base-100 shadow-xl cursor-pointer"
          key={episode.id}
          onClick={() => openModal(episode)}
        >
          <div className="card-body justify-between">
            <h2 className="card-title inline">
              <b>{episode.episode}: </b>
              {episode.name}
            </h2>
          </div>
        </div>
      ))}
      {isModalOpen && (
        <Modal episode={selectedEpisode} closeModal={closeModal} />
      )}
    </div>
  );
}

function Modal({
  episode,
  closeModal,
}: {
  episode: Episode | null;
  closeModal: () => void;
}) {
  return (
    <dialog className="modal modal-bottom sm:modal-middle" open>
      <div className="modal-box border">
        <h3 className="font-bold text-lg">{episode?.name}</h3>
        <ul className="py-2 space-y-2 grid">
          {episode?.characters.map((character, index) => (
            <li key={index}>
              <a href={character} target="_blank" rel="noopener noreferrer">
                {character}
              </a>
            </li>
          ))}
        </ul>
        <div className="modal-action">
          <button onClick={closeModal} className="btn">
            Cerrar
          </button>
        </div>
      </div>
    </dialog>
  );
}
