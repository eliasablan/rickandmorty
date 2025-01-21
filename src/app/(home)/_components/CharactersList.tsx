"use client";

import React from "react";
import { useCharactersContext } from "./CharactersContext";
import Image from "next/image";

export default function CharacterList() {
  const { isLoading, data, error } = useCharactersContext();

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

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {data.map((character) => (
        <div className="card border bg-base-100 shadow-xl" key={character.id}>
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
    </div>
  );
}
