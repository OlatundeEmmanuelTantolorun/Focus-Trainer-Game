import { createContext, useContext, useEffect, useState } from "react";
import { loadData, saveData, resetData } from "../utils/storage";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export function GameProvider({ children }) {
  const [data, setData] = useState(loadData());

  useEffect(() => {
    saveData(data);
  }, [data]);

  function update(values) {
    setData((prev) => ({
      ...prev,
      ...values,
    }));
  }

  function resetAll() {
    setData(resetData());
  }

  return (
    <GameContext.Provider
      value={{
        data,
        update,
        resetAll,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
