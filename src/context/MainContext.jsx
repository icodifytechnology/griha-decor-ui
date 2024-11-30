import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useGetConfiguration } from "src/reactQuery/home";

const initialState = {
  openMenu: false,
  categories:[],
  currency: {
    code: "NPR",
    symbol: "Rs",
    name: "NPR",
    rate: 1,
    image: "/assets/img/npr.webp",
  },
};

export const MainProvider = ({ children }) => {
  const [mainState, setMainState] = useState(initialState);
  const { data: configuration } = useGetConfiguration();

  useEffect(() => {
    if (configuration?.current_currency) {
      handleMainState({
        currency: configuration?.current_currency,
        categories: configuration?.category
      });
    } else {
      handleMainState(initialState);
    }
  }, [configuration?.current_currency]);

  const handleMainState = (data) => {
    setMainState({ ...mainState, ...data });
  };

  const memoedValue = useMemo(
    () => ({
      ...mainState,
      handleMainState,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mainState]
  );

  return (
    <MainContext.Provider value={memoedValue}>{children}</MainContext.Provider>
  );
};

export const MainContext = createContext(initialState);

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (context === undefined) {
    throw new Error("useMainContext must be used within a MainContextProvider");
  }
  return context;
};
