import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import uploadfile from './Uploadtxn.js';
import { useStorageUpload } from "@thirdweb-dev/react";
import './getfiles.css';



const Cid = () => {
  const [file, setFile] = useState({});
  const [details, setDetails] = useState({fileName:"", fileSize:0, cid:""});
  const [btnstate, setBtnstate] = useState(true);

  // const changeHandler = async (event) => {
  //   const temp = event.target.files[0];
  //   console.log(temp);
  //   //file received
  //   setFile(temp);
  //   //cid called
  //   const ipfs = await IPFS.create({repo: 'ok' + Math.random()});
  //   console.log("IPFS: ", ipfs);
  //   const tcid  = await ipfs.add(temp); //original
  //   // console.log("TCID: ", tcid);
  //   await ipfs.pin.add(CID.parse(tcid.path));
  //   // const cid = await ipfs.pin.add(CID.parse(tcid.path));
  //   //cid received
  //   console.log("tCID: ", tcid);
  //   //set details called
  //   setDetails({fileName:temp.name, fileSize:temp.size, cid:tcid.path});
  // };

  //after change change handler function
  const {mutateAsync: upload} = useStorageUpload();
  const changeHandler = async (event) => {
    const temp = event.target.files[0];
    setFile(temp);
    console.log("calling upload url");
    const uploadUrl = await upload({
      data: [temp],
      options: {
        uploadWithGatewayUrl: true,
        uploadWithoutDirectory: true
      }
    })
    // console.log("Upload URL: ", uploadUrl);
    const cid = uploadUrl[0].slice(34, 80)
    // console.log(cid);
    setDetails({fileName:temp.name, fileSize:temp.size, cid:cid});
  }

  const uploadFile = async () => {
    console.log(details);
    setBtnstate(!btnstate);
    uploadfile(details);
  }

  useEffect(() => {
    setBtnstate(!btnstate);
  },[details])

  const callAlert = () => {
    alert("Select File to upload");
  }

  let theme = createTheme({
    palette: {
      primary: {
        main: '#3700b3',
        dark: '3700b3',
        light: '#3700b3',
      },
    },
  });

  return (
    <>
      <div className="inputContainer">
      <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
        <input
          placeholder="Select File"
          className="textInput"
          type="file"
          name="file"
          onChange={changeHandler}
        />
          <div>
            {(btnstate) ?
              <Button variant="contained" onClick={uploadFile}>Upload</Button> :
              <Button  color="inherit" variant="outlined" onClick={callAlert}>Upload</Button>
            }
          </div>
        </Stack>
        </ThemeProvider>
      </div>
    </>
  );
};

export default Cid;
