import React, {useCallback, useEffect, useMemo, useState} from "react";
import styles from "./ReservedFinance.module.scss";
import Card from "../Card/Card.jsx";
import Stack from "../Stack/Stack.jsx";
import Button from "../Button/Button.jsx";
import Modal from "../Modal/Modal.jsx";
import useActive from "../../hooks/useActive.js";
import Input from "../Input/Input.jsx";
import formatMoney from "../../helpers/formatCurrency.js";
import {TrashFill, PlusSquareFill} from "react-bootstrap-icons";
import Divider from "../Divider/Divider.jsx";
import {useDispatch, useSelector} from "react-redux";
import {createReserve, deleteReserve, fetchReserves} from "../../store/reserves/reserves.actions.js";

const defaultReserveForm = {
    name: "",
    price: 0,
    link: ""
};

const ReservedFinance = () => {
    const dispatch = useDispatch();
    const {items: reserves, isLoading, isFetched} = useSelector(state => state.reserves);
    console.log(reserves, isLoading, isFetched)
    const [modalOpen, openModal, closeModal] = useActive(false);
    const [reserveForm, setReserveForm] = useState(defaultReserveForm);

    const onModalClose = useCallback(() => {
        closeModal();
        setReserveForm(defaultReserveForm);
    }, []);

    const handleChangeForm = useCallback((value, id) => {
        setReserveForm((reserveForm) => ({...reserveForm, [id]: value}));
    }, []);

    const handleChangePrice = useCallback((value) => {
        const match = value.match(/\d+\.?\d{0,2}/);
        setReserveForm((reserveForm) => ({...reserveForm, price: match ? +match[0] : 0}));
    }, []);

    const formValid = useMemo(() => {
        return !!reserveForm.name.trim() && !!reserveForm.price;
    }, [reserveForm]);

    const onAdd = useCallback(() => {
        dispatch(createReserve(reserveForm)).then(() => {
            dispatch(fetchReserves());
            onModalClose();
        })
    }, [reserveForm]);

    const onDelete = useCallback((id) => {
        dispatch(deleteReserve(id)).then(() => {
            dispatch(fetchReserves());
        })
    }, []);

    useEffect(() => {
        dispatch(fetchReserves());
    }, []);

    return (
        <Card padding={0}>
            <div style={{padding: "10px 20px"}}>

                    <Stack alignItems="center">
                        <h3>Зарезервированные финансы</h3>
                        <Button style={{flex: "none"}} onClick={openModal}>
                            <Stack alignItems="center" gap={10}>
                                <PlusSquareFill width={18} height={18}/>
                                <div>Добавить</div>
                            </Stack>
                        </Button>
                    </Stack>
            </div>
            <Divider/>
                {
                    reserves.map((reserve) => {
                        const content = !!reserve.link ? <a target="_blank" href={reserve.link}>{reserve.name}</a> : <div>{reserve.name}</div>;
                        return (
                            <React.Fragment key={reserve.id}>
                                <Stack style={{padding: "10px 20px"}}>
                                    {content}
                                    <div style={{flex: "none"}}>
                                        <Stack alignItems="center">
                                            <div>-{formatMoney(reserve.price)}</div>
                                            <TrashFill width={15} height={15} style={{cursor: "pointer"}} onClick={() => onDelete(reserve.id)}/>
                                        </Stack>
                                    </div>
                                </Stack>
                                <Divider/>
                            </React.Fragment>

                        )
                    })
                }

            <Modal open={modalOpen} title={"Добавить резерв"} onClose={onModalClose} actions={[
                <Button onClick={onModalClose}>Отменить</Button>,
                <Button disabled={!formValid} onClick={onAdd}>Добавить</Button>,
            ]}>
                <Stack flexDirection="column">
                    <Stack>
                        <Input value={reserveForm.name} label="Название" id="name" onChange={handleChangeForm}/>
                        <Input value={reserveForm.price} label="Стоимость" id="price" onChange={handleChangePrice}/>
                    </Stack>
                    <Input value={reserveForm.link} label="Ссылка на товар" id="link" onChange={handleChangeForm}/>
                </Stack>
            </Modal>
        </Card>
    )
}

export default ReservedFinance;