import axios from "../api/axiosConfig";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const PAGE_SIZE = 6;

const useInfiniteProducts = () => {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const pageRef = useRef(1);
  const fetchingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      try {
        const { data } = await axios.get(
          `/products?_page=1&_per_page=${PAGE_SIZE}`,
        );

        if (cancelled) return;

        // json-server v1 returns { data: [], items: ... }
        const items = Array.isArray(data) ? data : (data.data ?? []);

        setProducts(items);
        setHasMore(items.length === PAGE_SIZE);
        pageRef.current = 2;
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError("Failed to load products.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const fetchProducts = async () => {
    if (fetchingRef.current || !hasMore) return;

    fetchingRef.current = true;

    try {
      const { data } = await axios.get(
        `/products?_page=${pageRef.current}&_per_page=${PAGE_SIZE}`,
      );

      const items = Array.isArray(data) ? data : (data.data ?? []);

      setProducts((prev) => {
        const existingIds = new Set(prev.map((p) => String(p.id)));
        const unique = items.filter((p) => !existingIds.has(String(p.id)));

        return [...prev, ...unique];
      });

      pageRef.current += 1;
      setHasMore(items.length === PAGE_SIZE);
    } catch (err) {
      console.error("Pagination failed:", err);
      toast.error("Failed to load more products.");
    } finally {
      fetchingRef.current = false;
    }
  };
  return { products, loading, error, hasMore, fetchProducts };
};

export default useInfiniteProducts;
