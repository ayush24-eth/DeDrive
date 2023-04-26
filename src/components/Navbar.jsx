import React, {useEffect} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import logo from '../assets/logo.png';
import "./getfiles.css";
import Roboto from '@fontsource/roboto/500.css?inline';
import MM from "../assets/metamask-icon.png";
import { useAccount } from '../context/AccountContext';



const Navbar = () => {
  const [currentAccount,setCurrentAccount] = useAccount();
  
  const findMetamask = async () => {
    try {
      const getEthereumObject = () => window.ethereum;
      const ethereum = getEthereumObject();

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return null;
      }

      // console.log("We have the ethereum object", ethereum);

      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        return account;
      } else {
        console.error("No authorized account found");
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    findMetamask().then((account) => {
      if (account !== null) {
        setCurrentAccount(account);
      }
    });
  });

  const connectWallet = async () => {
    try {
      const getEthereumObject = () => window.ethereum;
      const ethereum = getEthereumObject();
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);

      setCurrentAccount(accounts[0]); //
    } 
    catch (error) {
      console.error(error);
    }
  };


  return (
    <AppBar sx={{ backgroundColor: "#2c2c2d", elevation:"8dp"}}>
      <Container className="container" maxWidth="xl">
        <Toolbar disableGutters>
          <a class="navbar-brand" href="#"><img src= {logo} alt="Logo" /></a>
          <Typography
            variant="h5"
            component="a"
            href=""
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: Roboto,
              fontWeight: 600,
              letterSpacing: ".1rem",
              color: "#BB86FC",
              textDecoration: "none",
            }}
          >
            De Drive
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            {currentAccount ? (
              <Stack
                direction="row"
                spacing={1}
                justifyContent="right"
                alignItems="flex-end"
              >
                <Chip
                  sx={{ color: "#BB86FC", borderColor: "#BB86FC", fontWeight: 600, letterSpacing: ".05rem"}}
                  avatar={<Avatar alt="M" src={MM} />}
                  label={
                    currentAccount.slice(0, 6) +
                    "..." +
                    currentAccount.slice(38, 43)
                  }
                  variant="outlined"
                  size="large"
                />
              </Stack>
            ) : (
              <Button variant="contained" onClick={connectWallet}>
                Connect Wallet
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
