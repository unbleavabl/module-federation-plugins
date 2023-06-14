import { useState, useEffect, useMemo, lazy } from "react";
import { loadComponent } from "../utils/federation";
import { useDynamicScript } from "./useDynamicScripts";

const componentCache = new Map();

export const useFederatedComponents = (opts) => {
  const [components, setComponents] = useState([]);

  const remoteUrls = useMemo(() => opts.map(({ url }) => url), [opts]);

  const { ready, errorLoading } = useDynamicScript(remoteUrls);

  useEffect(() => {
    if (ready) {
      const lazyComponents = opts.map(({ url, scope, module }) => {
        const key = `${url}-${scope}-${module}`;
        const Comp = lazy(loadComponent(scope, module));
        componentCache.set(key, Comp);
        return Comp;
      });

      setComponents(lazyComponents);
    }
  }, [ready, opts]);

  return { errorLoading, components };
};
