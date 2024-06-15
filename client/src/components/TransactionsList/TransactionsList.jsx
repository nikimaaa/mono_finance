import React from "react";
import styles from "./TransactionsList.module.scss";
import Stack from "../Stack/Stack.jsx";
import dayjs from "dayjs";
import formatCurrency from "../../helpers/formatCurrency.js";
import Card from "../Card/Card.jsx";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)

const TransactionsList = ({transactions}) => {
    return (
        <Card>
            <Stack flexDirection="column">
                {transactions.map(({id, amount, description, time, receiptId, mccInfo}) => {
                    return (
                        <Stack key={id}>
                            <div style={{width: "25%"}}>{description}</div>
                            <div style={{width: "25%"}}>{mccInfo.smile} {mccInfo.shortDescription}</div>
                            <div style={{width: "25%", textAlign: "right"}}>{formatCurrency(amount / 100)}</div>
                            <div style={{width: "25%", textAlign: "right"}}>{dayjs(time * 1000).format("DD.MM.YYYY")}</div>
                        </Stack>
                    )
                })}
            </Stack>
        </Card>
    );
}

export default TransactionsList;