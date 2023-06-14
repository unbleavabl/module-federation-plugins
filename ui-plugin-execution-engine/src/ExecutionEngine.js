import React, { useState, useEffect, Suspense } from "react";
import { useFederatedComponents } from "./hooks/useFederatedComponents";
import { getPluginList } from "./api/requests";

function ExecutionEngine() {
  const [fetchedPluginList, setFetchedPluginList] = useState([]);
  const { components, errorLoading } =
    useFederatedComponents(fetchedPluginList);

  useEffect(() => {
    (async () => {
      const response = await getPluginList();
      setFetchedPluginList(response);
    })();
  }, []);

  return (
    <div style={{ marginTop: "2em" }}>
      <div>Plugin Execution Engine</div>
      {!fetchedPluginList.length && <div>Loading Plugins</div>}
      <Suspense fallback="Loading System">
        {errorLoading
          ? `Error loading modules`
          : components.map((Component, index) => <Component key={index} />)}
      </Suspense>
    </div>
  );
}

export default ExecutionEngine;
