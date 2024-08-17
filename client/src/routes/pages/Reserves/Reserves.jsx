import React, {useCallback, useMemo, useState} from "react"
import {
    Box,
    Button,
    Card,
    CircularProgress,
    InputAdornment,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import TitleCard from "../../../components/TitleCard/TitleCard.jsx";
import TotalCard from "./components/TotalCard/TotalCard.jsx";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import useNavState from "../../../hooks/useNavState.js";
import {useDispatch, useSelector} from "react-redux";
import {
    createReserve,
    deleteReserve,
    fetchReserves,
    fetchReservesTotal,
    updateReserve
} from "../../../store/reserves/reserves.actions.js";
import ReservesList from "./components/ReservesList/ReservesList.jsx";
import EmptyState from "../../../components/EmptyState/EmptyState.jsx";
import useDebouncedEffect from "use-debounced-effect";
import AddBoxIcon from '@mui/icons-material/AddBox';
import useActive from "../../../hooks/useActive.js";
import EditReserveModal from "./components/EditReserveModal/EditReserveModal.jsx";

const defaultReserveForm = {
    name: "",
    price: 0,
    link: ""
};

const Reserves = () => {
    const dispatch = useDispatch();
    const {
        isLoading,
        isFetched,
        items: reserves,
        total,
        isFetchedTotal
    } = useSelector(state => state.reserves);

    const [createReserveForm, setCreateReserveForm] = useState(defaultReserveForm);
    const [updateReserveForm, setUpdateReserveForm] = useState(defaultReserveForm);
    const [createModalOpen, openCreateModal, closeCreateModal] = useActive(false);
    const [updateModalOpen, openUpdateModal, closeUpdateModal] = useActive(false);

    const [filters, setFilters] = useNavState({
        query: "",
        sort: "createdAt-asc"
    });

    const fetchData = useCallback(() => {
        dispatch(fetchReserves(filters));
        dispatch(fetchReservesTotal());
    }, [filters]);

    const onFiltersChange = (event) => {
        setFilters({...filters, [event.target.name]: event.target.value});
    }

    const onQueryClear = () => {
        setFilters({...filters, query: ""});
    }

    const handleChangeForm = useCallback((setter) => {
        return (event) => {
            const {id, value} = event.target;
            setter((reserveForm) => ({...reserveForm, [id]: value}));
        }
    }, []);

    const onCreate = useCallback(() => {
        dispatch(createReserve(createReserveForm)).then(() => {
            closeCreateModal();
            fetchData();
        })
    }, [createReserveForm, fetchData]);

    const onEditConfirm = useCallback(() => {
        dispatch(updateReserve(updateReserveForm)).then(() => {
            closeUpdateModal();
            fetchData();
        })
    }, [updateReserveForm, fetchData]);

    const onEdit = useCallback((id) => {
        console.log(id)
        console.log(reserves.find((reserve) => reserve.id === id))
        setUpdateReserveForm(reserves.find((reserve) => reserve.id === id));
        openUpdateModal();
    }, [reserves]);

    const onDelete = useCallback((id) => {
        dispatch(deleteReserve(id)).then(() => {
            closeCreateModal();
            fetchData();
        })
    }, [fetchData]);

    const list = useMemo(() => {
        if (!isFetched) {
            return <Stack alignItems="center"><CircularProgress/></Stack>
        }
        if (isFetched && reserves.length === 0) {
            return (
                <Box padding={8}>
                    <EmptyState
                        title="У вас еще нет резервов"
                        imageSrc={"/assets/emptyState.png"}
                        subtitle="Создайте новый резерв чтобы увидеть его в этом списке."
                        actions={[{label: "Создать резерв", onAction: openCreateModal}]}
                    />
                </Box>
            )
        }
        return <ReservesList reserves={reserves} onDelete={onDelete} onEdit={onEdit}/>
    }, [isFetched, reserves]);

    useDebouncedEffect(() => {
        fetchData();
    }, {delay: 500, ignoreInitialCall: true}, [fetchData]);

    return (
        <Box sx={{p: "30px"}}>
            <Stack spacing={2}>
                <Stack justifyContent="space-between" direction="row" spacing={2}>
                    <TitleCard
                        imageSrc="/assets/financialPlan.png"
                        title="Резервы"
                        subtitle="пфцпфцпфцп фцпфцп фцпп"
                    />
                    <TotalCard
                        isLoading={!isFetchedTotal}
                        value={total}
                    />
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
                            <Button
                                sx={{minWidth: 120}}
                                color="success"
                                variant="contained"
                                onClick={openCreateModal}
                            >
                                Добавить
                            </Button>
                        </Stack>
                        {list}
                    </Stack>
                </Card>
            </Stack>
            <EditReserveModal
                open={createModalOpen}
                onClose={closeCreateModal}
                form={createReserveForm}
                onChange={handleChangeForm(setCreateReserveForm)}
                onConfirm={onCreate}
                acceptAction="Добавить"
                isLoading={isLoading}
            />
            <EditReserveModal
                open={updateModalOpen}
                onClose={closeUpdateModal}
                form={updateReserveForm}
                onChange={handleChangeForm(setUpdateReserveForm)}
                onConfirm={onEditConfirm}
                acceptAction="Обновить"
                isLoading={isLoading}
            />
        </Box>
    )
}

export default Reserves;