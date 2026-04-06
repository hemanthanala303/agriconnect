import { useState, useEffect } from "react";

/**
 * Custom hook for fetching data with loading and error states
 */
export function useFetch(fetchFn, dependencies = []) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, dependencies);

  return { data, isLoading, error, refetch };
}

/**
 * Custom hook for paginated data fetching
 */
export function usePaginatedFetch(fetchFn, initialPage = 1, initialLimit = 10) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchFn(page, limit);
      setData({ ...result, page, limit });
    } catch (err) {
      setError(err.message || "Failed to fetch data");
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [page, limit]);

  return { data, isLoading, error, refetch, setPage, setLimit };
}
