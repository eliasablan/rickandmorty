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

export type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
};

type LocationsContextType = {
  isLoading: boolean;
  data: Location[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pages: number;
  error: string | null;
};

export const LocationsContext = createContext<LocationsContextType | undefined>(
  undefined
);

export function LocationsProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [data, setData] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      setError(null);
      let url = `https://rickandmortyapi.com/api/location/?`;
      if (page) {
        url += `page=${page}&`;
      }

      try {
        const response = await axios.get(url);
        setData(response.data.results as Location[]);
        setPages(response.data.info.pages);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setError("No hay resultados para la búsqueda.");
        } else {
          setError("Ocurrió un error al buscar las ubicaciones.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchLocations();
  }, [page]);

  return (
    <LocationsContext.Provider
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
    </LocationsContext.Provider>
  );
}

export function useLocationsContext() {
  const locations = useContext(LocationsContext);

  if (locations === undefined) {
    throw new Error(
      "useLocationsContext must be used within a LocationsProvider"
    );
  }

  return locations;
}
