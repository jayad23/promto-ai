"use client";
import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(url);
      const results = await response.json();
      setData(results);
    };

    fetchPrompts();
  }, [url]);

  return [data, setData];
};
