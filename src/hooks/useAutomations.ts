// src/hooks/useAutomations.ts

import { useEffect, useState } from "react";
import { getAutomations } from "../api/mockApi";

export const useAutomations = () => {
  const [automations, setAutomations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAutomations = async () => {
      const data: any = await getAutomations();
      setAutomations(data);
      setLoading(false);
    };

    fetchAutomations();
  }, []);

  return { automations, loading };
};