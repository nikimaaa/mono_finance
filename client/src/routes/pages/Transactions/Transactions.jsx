import React, {useCallback, useEffect, useMemo} from "react"
import {
    Box,
    Card,
    CircularProgress,
    InputAdornment,
    MenuItem,
    Pagination,
    Select,
    Stack,
    TextField
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import TransactionsList from "../../../components/TransactionsList/TransactionsList.jsx";
import TitleCard from "../../../components/TitleCard/TitleCard.jsx";
import IncomesCard from "./components/IncomesCard/IncomesCard.jsx";
import ExpensesCard from "./components/ExpensesCard/ExpensesCard.jsx";
import {fetchTransactions, fetchTransactionsSummary} from "../../../store/transactions/transactions.actions.js";
import SearchIcon from "@mui/icons-material/Search.js";
import CloseIcon from "@mui/icons-material/Close.js";
import EmptyState from "../../../components/EmptyState/EmptyState.jsx";
import ReservesList from "../Reserves/components/ReservesList/ReservesList.jsx";
import useNavState from "../../../hooks/useNavState.js";
import useDebouncedEffect from "use-debounced-effect";

const Transactions = () => {
    const {items: transactions, pagesCount, summary, isFetched} = useSelector(state => state.transactions);
    const dispatch = useDispatch();
    const [filters, setFilters] = useNavState({
        query: "",
        sort: "occurredAt-desc",
        page: 1,
        pageSize: 10
    });

    const onFiltersChange = (event) => {
        setFilters({...filters, [event.target.name]: event.target.value, page: 1});
    }

    const onQueryClear = () => {
        setFilters({...filters, query: "", page: 1});
    }

    const onPageChange = useCallback((event, page) => {
        setFilters({...filters, page})
    }, [filters]);

    useEffect(() => {
        dispatch(fetchTransactionsSummary());
    }, []);

    useDebouncedEffect(() => {
        dispatch(fetchTransactions(filters));
    }, {delay: 500, ignoreInitialCall: true},[filters]);

    const list = useMemo(() => {
        if(!isFetched) {
            return <Stack alignItems="center"><CircularProgress/></Stack>
        }
        if(isFetched && transactions.length === 0) {
            return <EmptyState title="Ничего не найдено" subtitle="Попробуйте поменять запрос"/>
        }
        return <TransactionsList transactions={transactions}/>
    }, [isFetched, transactions]);

    console.log(transactions)

    return (
        <Box sx={{p: "30px"}}>
            <Stack spacing={2}>
                <Stack justifyContent="space-between" direction="row" spacing={2}>
                    <TitleCard
                        title="Транзакции"
                        subtitle="qwe"
                        imageSrc="/assets/transactions2.webp"
                    />
                    <IncomesCard value={summary.incomes / 100}/>
                    <ExpensesCard value={summary.expenses / 100}/>
                </Stack>

                <Card sx={{background: "transparent", border: "2px solid #36393E", borderRadius: 4, p: "30px"}}>
                    <Stack spacing={2}>
                        <Stack spacing={2} direction="row">
                            <TextField
                                placeholder="Искать..."
                                name="query"
                                value={filters.query}
                                onChange={onFiltersChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
                                    endAdornment: <InputAdornment position="end">
                                        <CloseIcon
                                            sx={{cursor: "pointer", display: filters.query ? "block" : "none"}}
                                            onClick={onQueryClear}
                                        />
                                    </InputAdornment>
                                }}
                                fullWidth
                            />
                            <Select sx={{minWidth: 200}} value={filters.sort} onChange={onFiltersChange} name="sort">
                                <MenuItem value={"occurredAt-desc"}>Произведено раньше</MenuItem>
                                <MenuItem value={"occurredAt-asc"}>Произведено позже</MenuItem>
                            </Select>
                        </Stack>
                        {list}
                        <Stack alignItems="center">
                            <Pagination
                                shape="rounded"
                                variant="outlined"
                                count={pagesCount}
                                page={filters.page}
                                onChange={onPageChange}
                                showFirstButton
                                showLastButton
                            />
                        </Stack>
                    </Stack>
                </Card>
            </Stack>
        </Box>
    )
}

export default Transactions;