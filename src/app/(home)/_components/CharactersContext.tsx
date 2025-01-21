"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";

type Character = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Male" | "Female" | "Genderless" | "unknown";
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

type CharactersContextType = {
  isLoading: boolean;
  data: Character[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  pages: number;
  error: string | null;
};

export const CharactersContext = createContext<
  CharactersContextType | undefined
>(undefined);

export function CharactersProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState<Character[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true);
      setError(null);
      let url = `https://rickandmortyapi.com/api/character/?`;
      if (page) {
        url += `page=${page}&`;
      }
      if (name) {
        url += `name=${name}&`;
      }
      if (status) {
        url += `status=${status}&`;
      }
      try {
        const response = await axios.get(url);
        setData(response.data.results as Character[]);
        setPages(response.data.info.pages);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setError("No hay resultados para la búsqueda.");
        } else {
          setError("Ocurrió un error al buscar los personajes.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchCharacters();
  }, [page, name, status]);

  return (
    <CharactersContext.Provider
      value={{
        isLoading,
        data,
        page,
        setPage,
        name,
        setName,
        status,
        setStatus,
        pages,
        error,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
}

export function useCharactersContext() {
  const characters = useContext(CharactersContext);

  if (characters === undefined) {
    throw new Error(
      "useCharactersContext must be used within a CharactersProvider"
    );
  }

  return characters;
}
