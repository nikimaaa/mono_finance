import {useCallback, useEffect, useState} from 'react'
import './App.css'
import axios from "axios";
import ClientInfo from "./components/ClientInfo/ClientInfo.jsx";
import Stack from "./components/Stack/Stack.jsx";
import ReservedFinance from "./components/ReservedFinance/ReservedFinance.jsx";
import TransactionsList from "./components/TransactionsList/TransactionsList.jsx";
import Chart from "./components/Chart/Chart.jsx";
import Card from "./components/Card/Card.jsx";

function App() {
  const [clientInfo, setClientInfo] = useState({
    clientId: "",
    name: "User Name",
    webHookUrl: "",
    permissions: "",
    accounts: [
      {
        id: "",
        sendId: "",
        currencyCode: 980,
        cashbackType: "UAH",
        balance: 0,
        creditLimit: 0,
        maskedPan: [
          "***************",
          "***************"
        ]
      }
    ]
  });
  const [reserves, setReserves] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [analytic, setAnalytic] = useState([]);

  useEffect(() => {
    axios.get("/api/client-info").then((response) => {
      setClientInfo(response.data);
    })
    axios.get("/api/client-transactions").then((response) => {
      setTransactions(response.data.transactions);
      setAnalytic(response.data.analytic);
    })
    axios.get("/api/reserve").then((response) => {
      setReserves(response.data);
    })
  }, []);

  const addReserve = useCallback((reserve) => {
    axios.post("/api/reserve", reserve).then((response) => {
      setReserves((reserves) => [...reserves, response.data]);
    });
  }, []);

  const deleteReserve = useCallback((id) => {
    axios.delete(`/api/reserve/${id}`).then((response) => {
      setReserves((reserves) => reserves.filter((reserve) => reserve.id !== id));
    });
  }, []);

  console.log(analytic)
  return (
      <Stack flexDirection="column">
        <Stack>
          <ClientInfo clientInfo={clientInfo} reserves={reserves}/>
          <ReservedFinance reserves={reserves} addReserve={addReserve} deleteReserve={deleteReserve}/>
        </Stack>
        <TransactionsList transactions={transactions}/>
        {analytic.map((item) => {
          return (
              <Card>
                <div style={{width: "100%", height: "500px"}}>
                  <Chart data={[item]}/>
                </div>
              </Card>
          )
        })}


      </Stack>
  )
}

export default App
