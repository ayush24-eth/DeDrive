import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Cid from "./components/Cid";
import Files from "./components/Files";
import { AccountProvider} from "./context/AccountContext";
import { ThirdwebProvider } from '@thirdweb-dev/react';


function App() {
  return (
    <AccountProvider>
        <Navbar />
          <ThirdwebProvider>
            <Cid />
          </ThirdwebProvider>
        <Files />
    </AccountProvider>
  );
}

export default App;
