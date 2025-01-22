"use client";

import React, { useState } from "react";
import { Location, useLocationsContext } from "./LocationsContext";

export default function LocationsList() {
  const { isLoading, data, error } = useLocationsContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
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

  const openModal = (location: Location) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLocation(null);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {data.map((location) => (
        <div
          className="card border bg-base-100 shadow-xl cursor-pointer"
          key={location.id}
          onClick={() => openModal(location)}
        >
          <div className="card-body justify-between">
            <h2 className="card-title">{location.name}</h2>
          </div>
        </div>
      ))}
      {isModalOpen && (
        <Modal location={selectedLocation} closeModal={closeModal} />
      )}
    </div>
  );
}

function Modal({
  location,
  closeModal,
}: {
  location: Location | null;
  closeModal: () => void;
}) {
  return (
    <dialog className="modal modal-bottom sm:modal-middle" open>
      <div className="modal-box border">
        <h3 className="font-bold text-lg">{location?.name}</h3>
        <ul className="py-2 space-y-2 grid">
          {location?.residents.map((resident, index) => (
            <li key={index}>
              <a href={resident} target="_blank" rel="noopener noreferrer">
                {resident}
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
