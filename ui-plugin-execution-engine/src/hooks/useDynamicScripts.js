import { useState, useEffect } from "react";

const urlCache = new Set();

export const useDynamicScript = (urls) => {
  const [ready, setReady] = useState(() => new Array(urls.length).fill(false));
  const [errorLoading, setErrorLoading] = useState(() =>
    new Array(urls.length).fill(false)
  );

  const setReadyAtIndex = (i, value) => {
    setReady((prev) => {
      const newList = [...prev];
      newList[i] = value;
      return newList;
    });
  };

  const setErrorLoadingAtIndex = (i, value) => {
    setErrorLoading((prev) => {
      const newList = [...prev];
      newList[i] = value;
      return newList;
    });
  };

  useEffect(() => {
    const elementsAndUrls = urls.map((url, index) => {
      if (urlCache.has(url)) {
        setReadyAtIndex(index, true);
        setErrorLoadingAtIndex(index, false);
        return undefined;
      }

      setReadyAtIndex(index, false);
      setErrorLoadingAtIndex(index, false);

      const element = document.createElement("script");

      element.src = url;
      element.type = "text/javascript";
      element.async = true;

      element.onload = () => {
        urlCache.add(url);
        setReadyAtIndex(index, true);
      };

      element.onerror = () => {
        setReadyAtIndex(index, false);
        setErrorLoadingAtIndex(index, true);
      };

      document.head.appendChild(element);
      return [element, url];
    });

    return () => {
      elementsAndUrls.forEach((tuple) => {
        if (!tuple) {
          return;
        }
        const [element, url] = tuple;
        urlCache.delete(url);
        document.head.removeChild(element);
      });
    };
  }, [urls]);

  return {
    errorLoading: errorLoading.some((x) => x === true),
    ready: !!ready.length && ready.every((x) => x === true),
  };
};
