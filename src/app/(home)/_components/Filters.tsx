"use client";

import React, { useRef } from "react";
import { useCharactersContext } from "./CharactersContext";
import { useDebouncedCallback } from "use-debounce";

const statusDropdown = [
  { value: "Alive", title: "Vivos" },
  { value: "Dead", title: "Muertos" },
  { value: "unknown", title: "Desconocido" },
];

export default function Filters() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { name, setName, status, setStatus } = useCharactersContext();

  const handleSearch = useDebouncedCallback((term: string) => {
    setName(term);
  }, 300);

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setName("");
  };

  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-row gap-4 items-center">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn">
            Estado de los personajes
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-2xl"
          >
            {statusDropdown.map((element) => (
              <li key={element.value}>
                <button onClick={() => setStatus(element.value)}>
                  {element.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {status && (
          <div className="flex gap-2">
            <p className="cursor-default font-semibold text-sm">
              {
                statusDropdown.find((element) => element.value === status)
                  ?.title
              }
            </p>
            <button onClick={() => setStatus("")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-3 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 1.5a1 1 0 0 1 1.414 0L8 7.586l5.086-6.086a1 1 0 0 1 1.414 1.414L9.414 9l5.086 5.086a1 1 0 0 1-1.414 1.414L8 10.414l-5.086 5.086a1 1 0 0 1-1.414-1.414L6.586 9 1.5 3.914A1 1 0 0 1 1.5 1.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <label className="input input-bordered flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          className="grow"
          placeholder="Busca por nombre"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        {name ? (
          <button onClick={clearInput}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M1.5 1.5a1 1 0 0 1 1.414 0L8 7.586l5.086-6.086a1 1 0 0 1 1.414 1.414L9.414 9l5.086 5.086a1 1 0 0 1-1.414 1.414L8 10.414l-5.086 5.086a1 1 0 0 1-1.414-1.414L6.586 9 1.5 3.914A1 1 0 0 1 1.5 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </label>
    </div>
  );
}
