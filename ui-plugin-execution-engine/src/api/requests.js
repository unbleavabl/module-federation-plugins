export const getPluginList = async () => {
  const res = await fetch("http://localhost:3900/plugins");
  const json = await res.json();
  console.log({ json });
  return json;
};
