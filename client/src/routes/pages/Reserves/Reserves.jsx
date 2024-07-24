import React, {useCallback, useEffect, useMemo} from "react"
import {Box, Card, CircularProgress, InputAdornment, MenuItem, Select, Stack, TextField} from "@mui/material";
import TitleCard from "../../../components/TitleCard/TitleCard.jsx";
import TotalCard from "./components/TotalCard/TotalCard.jsx";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import useNavState from "../../../hooks/useNavState.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchReserves} from "../../../store/reserves/reserves.actions.js";
import ReservesList from "./components/ReservesList/ReservesList.jsx";
import EmptyState from "../../../components/EmptyState/EmptyState.jsx";
import useDebouncedEffect from "use-debounced-effect";

const Reserves = () => {
    const dispatch = useDispatch();
    const {isLoading, isFetched, items: reserves} = useSelector(state => state.reserves);
    const [filters, setFilters] = useNavState({
        query: "",
        sort: "createdAt-asc"
    });

    const onFiltersChange = (event) => {
        setFilters({...filters, [event.target.name]: event.target.value});
    }

    const onQueryClear = () => {
        setFilters({...filters, query: ""});
    }

    const list = useMemo(() => {
        if(!isFetched) {
            return <Stack alignItems="center"><CircularProgress/></Stack>
        }
        if(isFetched && reserves.length === 0) {
            return <EmptyState title="Ничего не найдено" subtitle="Попробуйте поменять запрос или создайте новый резерв"/>
        }
        return <ReservesList reserves={reserves}/>
    }, [isFetched, reserves]);

    useDebouncedEffect(() => {
        dispatch(fetchReserves(filters));
    }, {delay: 500, ignoreInitialCall: true} ,[filters]);

    return (
        <Box sx={{p: "30px"}}>
            <Stack spacing={2}>
                <Stack justifyContent="space-between" direction="row" spacing={2}>
                    <TitleCard
                        imageSrc="/assets/financialPlan.png"
                        title="Резервы"
                        subtitle="пфцпфцпфцп фцпфцп фцпп"
                    />
                    <TotalCard/>
                </Stack>
                <Card sx={{p: "30px", background: "transparent", borderRadius: 4, border: "2px solid #36393E"}}>
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
                                <MenuItem value={"createdAt-desc"}>Создано раньше</MenuItem>
                                <MenuItem value={"createdAt-asc"}>Создано позже</MenuItem>
                                <MenuItem value={"name-desc"}>Имя по убыванию</MenuItem>
                                <MenuItem value={"name-asc"}>Имя по возрастанию</MenuItem>
                            </Select>
                        </Stack>
                        {list}
                    </Stack>
                </Card>
            </Stack>
        </Box>
    )
}

export default Reserves;