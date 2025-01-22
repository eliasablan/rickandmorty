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

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

type EpisodesContextType = {
  isLoading: boolean;
  data: Episode[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pages: number;
  error: string | null;
};

export const EpisodesContext = createContext<EpisodesContextType | undefined>(
  undefined
);

export function EpisodesProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [data, setData] = useState<Episode[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      setIsLoading(true);
      setError(null);
      let url = `https://rickandmortyapi.com/api/episode/?`;
      if (page) {
        url += `page=${page}&`;
      }

      try {
        const response = await axios.get(url);
        setData(response.data.results as Episode[]);
        setPages(response.data.info.pages);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setError("No hay resultados para la búsqueda.");
        } else {
          setError("Ocurrió un error al buscar los episodios.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchEpisodes();
  }, [page]);

  return (
    <EpisodesContext.Provider
      value={{
        isLoading,
        data,
        page,
        setPage,
        pages,
        error,
      }}
    >
      {children}
    </EpisodesContext.Provider>
  );
}

export function useEpisodesContext() {
  const episodes = useContext(EpisodesContext);

  if (episodes === undefined) {
    throw new Error(
      "useEpisodesContext must be used within a EpisodesProvider"
    );
  }

  return episodes;
}
