import { ethers } from "ethers";
import abi from "../contracts/Drive.json";

const uploadfile = async (props) => {
  try {
    // const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const contractABI = abi.abi;
    // console.log('abi', contractABI);
    const { ethereum } = window;
    // console.log("ethereum:", ethereum);
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // console.log("provider", provider);
      const signer =  provider.getSigner();
      // console.log("signer", signer);
      const deDriveContract = new ethers.Contract(contractAddress, contractABI, signer);
      console.log(deDriveContract);
      
      const uploadTxn = await deDriveContract.upload(props.fileName, props.fileSize, props.cid);

      console.log("Mining Upload Txn....", uploadTxn.hash);

      await uploadTxn.wait();
      console.log("Mined:", uploadTxn.hash);
      alert("Uploaded...");
    } else {
      console.log("Ethereum object doesn't exist");
    }
  } catch (error) {
    console.log(error);
  }
};

export default uploadfile;
