import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../contracts/Drive.json";
import { useAccount } from "../context/AccountContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./getfiles.css";

const Files = () => {
  const [currentAccount, setCurrentAccount] = useAccount();
  const [files, setFiles] = useState([]);

  const getAllFiles = async () => {
    try {
      const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
      const contractABI = abi.abi;
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const deDriveContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        // console.log("de Drive Contract: ", deDriveContract);
        const allFiles = await deDriveContract.getAllFiles();
        // console.log("all files fetched from contract");
        // console.log(Number(allFiles[1][3]._hex));

          let displayFiles = [];
          // console.log("Display file created");
          allFiles.forEach((allfile) => {
            let tempFile = [];
            tempFile.push(allfile[0]);
            tempFile.push(allfile[1]);
            tempFile.push(allfile[2]);
            tempFile.push(Number(allfile[3]._hex));
            tempFile.push(Number(allfile[4]._hex));
            displayFiles.unshift(tempFile);
          });
          // console.log("files copied in display files");

          setFiles(displayFiles);
        // }
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFiles();
  }, [currentAccount, files]);

  return (
    <div className="filesContainer">
      {currentAccount === "" ? (
        <div className="noFiles">
          <p>Connect your Wallet</p>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ 
            minWidth: 650, 
            backgroundColor:"#212120",
            elevation:"8dp",
            "& th": {fontSize: "1.2rem",color: "#576CBC"}
          }} 
            aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sl&nbsp;No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="left">Upload&nbsp;Date</TableCell>
                <TableCell align="left">File&nbsp;Size</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }}}
                >
                  
                  <TableCell sx={{color:"#A5D7E8"}}>{index+1+"."}</TableCell>
                  <TableCell sx={{color:"#A5D7E8"}}>
                    <a href={`https://ipfs.thirdwebcdn.com/ipfs/${row[1]}`}> 
                      {row[2]} 
                    </a>
                  </TableCell>
                  <TableCell sx={{color:"#A5D7E8"}}>{(row[3] / 1000000).toFixed(2)} MB</TableCell>
                  <TableCell sx={{color:"#A5D7E8"}}>
                    {new Date(row[4] * 1000).toDateString()}
                  </TableCell>
                
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Files;
