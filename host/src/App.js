import { lazy, Suspense } from "react";

const PluginExecutionEngine = lazy(() =>
  import("pluginEngine/ExecutionEngine")
);

export const App = () => {
  return (
    <div>
      <div>Hello from Host</div>
      <Suspense fallback={<div>Loading Plugins</div>}>
        <PluginExecutionEngine />
      </Suspense>
    </div>
  );
};

export default App;
