import { createContext, useContext, useState } from 'react';

const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
  const [globalSearch, setGlobalSearch] = useState('');

  return (
    <AssetContext.Provider value={{ globalSearch, setGlobalSearch }}>
      {children}
    </AssetContext.Provider>
  );
};

export const useAssetContext = () => useContext(AssetContext);
