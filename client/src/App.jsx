import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";
import Card from "./components/Card/Card.jsx";
import Stack from "./components/Stack/Stack.jsx";
import ClientInfo from "./components/ClientInfo/ClientInfo.jsx";

function App() {
  const [clientInfo, setClientInfo] = useState({
    "clientId": "",
    "name": "User Name",
    "webHookUrl": "",
    "permissions": "",
    "accounts": [
      {
        "id": "",
        "sendId": "",
        "currencyCode": 980,
        "cashbackType": "UAH",
        "balance": 0,
        "creditLimit": 0,
        "maskedPan": [
          "***************",
          "***************"
        ],
        "type": "black",
        "iban": "UA163220010000026202330760802"
      }
    ]
  });

  useEffect(() => {
    axios.get("/api/client-info").then((response) => {
      setClientInfo(response.data);
    })
  }, []);

  return (
    <>
      <ClientInfo clientInfo={clientInfo}/>
    </>
  )
}

export default App
