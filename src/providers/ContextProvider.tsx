import { createContext, useState } from 'react';

export const ContextQ = createContext({});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = useState(0);
  return (
    <ContextQ.Provider value={{ value, setValue }}>
      {children}
    </ContextQ.Provider>
  );
};

export default ContextProvider;
