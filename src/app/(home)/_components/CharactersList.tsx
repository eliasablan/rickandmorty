"use client";

import React, { useState } from "react";
import { Character, useCharactersContext } from "./CharactersContext";
import Image from "next/image";

export default function CharacterList() {
  const { isLoading, data, error } = useCharactersContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

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

  const openModal = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {data.map((character, idx) => (
        <div
          className="card border bg-base-100 shadow-xl cursor-pointer"
          key={idx}
          onClick={() => openModal(character)}
        >
          <figure className="relative aspect-square">
            <Image
              fill
              sizes="300px"
              src={character.image}
              alt="Album"
              className="object-cover"
            />
          </figure>
          <div className="card-body justify-between">
            <h2 className="card-title">{character.name}</h2>
            <div>
              <p>
                <b>Especie: </b>
                {character.species}
              </p>
              <p>
                <b>Origen: </b>
                {character.origin.name}
              </p>
              <p>
                <b>Estado: </b>
                {character.status}
              </p>
            </div>
          </div>
        </div>
      ))}
      {isModalOpen && (
        <Modal character={selectedCharacter} closeModal={closeModal} />
      )}
    </div>
  );
}

function Modal({
  character,
  closeModal,
}: {
  character: Character | null;
  closeModal: () => void;
}) {
  return (
    <dialog className="modal modal-bottom sm:modal-middle" open>
      <div className="modal-box border">
        <h3 className="font-bold text-lg">
          Episodios donde aparece {character?.name}
        </h3>
        <ul className="py-2 space-y-2 grid grid-cols-3 items-baseline">
          {character?.episode.map((episodeUrl, index) => (
            <li key={index}>
              <a href={episodeUrl} target="_blank" rel="noopener noreferrer">
                Episodio {index + 1}
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
