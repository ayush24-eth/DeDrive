import { useState, createContext, useContext } from "react";

export const AccountContext = createContext();

export function useAccount() {
    return useContext(AccountContext);
}

export function AccountProvider(props) {
  const [currentAccount, setCurrentAccount] = useState("");
  

  return (
    <AccountContext.Provider value = {[currentAccount, setCurrentAccount]}>
            {props.children}
    </AccountContext.Provider>
  );
}
