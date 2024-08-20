import React from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import {Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";

const EditReserveModal = ({open, onClose, form, onChange, onConfirm, acceptAction, isLoading}) => {
    return (
        <Dialog fullWidth maxWidth={"sm"} onClose={onClose} open={open}>
            <DialogTitle>Добавить резерв</DialogTitle>
            <DialogContent>
                <Stack
                    direction="column"
                    spacing={2}
                    sx={{paddingTop: "20px"}}
                >
                    <Stack
                        direction="row"
                        spacing={2}
                    >
                        <TextField
                            sx={{flex: "1 1 auto"}}
                            value={form.name}
                            label="Название"
                            id="name"
                            onChange={onChange}
                        />
                        <TextField
                            sx={{flex: "1 1 auto"}}
                            value={form.price}
                            label="Стоимость"
                            id="price"
                            onChange={onChange}
                        />
                    </Stack>
                    <TextField
                        value={form.link}
                        label="Ссылка на товар"
                        id="link"
                        onChange={onChange}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    onClick={onClose}
                    loading={isLoading}
                >
                    Отмена
                </LoadingButton>
                <LoadingButton
                    color="success"
                    onClick={onConfirm}
                    loading={isLoading}
                >
                    {acceptAction}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default EditReserveModal;