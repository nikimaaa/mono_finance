import React, {useEffect} from 'react';
import {Card, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchTransactions} from "../../../../../store/transactions/transactions.actions.js";
import TransactionsList from "../../../../../components/TransactionsList/TransactionsList.jsx";
import ListSkeleton from "../../../../../components/ListSkeleton/ListSkeleton.jsx";

const LastTransactionsCard = () => {
    const {isFetched, items: transactions} = useSelector((state) => state.transactions);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTransactions({sort: "occurredAt-desc", page: 1, pageSize: 5}));
    }, []);

    return (
        <Card
            sx={{p: "30px", background: "transparent", border: "2px solid #36393E", borderRadius: 4, flex: "1 1 500px"}}>
            <Stack spacing={2}>
                <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" component="h4">Последние транзакции</Typography>
                    <Link to={"/transactions"}><Typography variant="body1" component="p">Смотреть
                        все</Typography></Link>
                </Stack>
                {isFetched ? <TransactionsList transactions={transactions}/> : <ListSkeleton rowsCount={5} columnsCount={4} gap={5}/>}

            </Stack>
        </Card>
    )
}

export default LastTransactionsCard;