import React, {useMemo} from "react";
import Card from "../Card/Card.jsx";
import Stack from "../Stack/Stack.jsx";
import formatMoney from "../../helpers/formatCurrency.js";
import dayjs from "dayjs";
import Divider from "../Divider/Divider.jsx";

const EVERY_DAY_BILL = 1000;

const ClientInfo = ({clientInfo, reserves}) => {
    const balance = useMemo(() => {
        return clientInfo.accounts[0].balance / 100;
    }, [clientInfo.accounts[0]]);

    const creditLimit = useMemo(() => {
        return clientInfo.accounts[0].creditLimit / 100;
    }, [clientInfo.accounts[0]])

    const realBalance = useMemo(() => {
        return balance - creditLimit;
    }, [balance, creditLimit]);

    const readableRealBalance = useMemo(() => {
        return realBalance;
    }, [realBalance]);

    const daysToTheNextSalary = useMemo(() => {
        const date = dayjs();
        const previousSalaryDay = date.date() > 10 ? date.date(10) : date.subtract(1, "month").date(10);
        const passedFromPreviousSalary = date.diff(previousSalaryDay, "day");
        const daysInMonth = previousSalaryDay.daysInMonth();
        let result = daysInMonth - passedFromPreviousSalary;
        if (result <= 3 && realBalance >= 50000) {
            return date.add(1, "month").date(10).diff(date, "day")
        }
        return result;
    }, [realBalance]);

    const monthCost = useMemo(() => {
        return daysToTheNextSalary * EVERY_DAY_BILL;
    }, [daysToTheNextSalary]);

    const additionalMoney = useMemo(() => {
        return realBalance - monthCost;
    }, [realBalance, monthCost]);

    const reservesPrice = useMemo(() => {
        return reserves.reduce((acc, current) => acc + +current.price, 0);
    }, [reserves]);

    const moneyAfterReserves = useMemo(() => {
        return additionalMoney - reservesPrice;
    }, [additionalMoney, reservesPrice]);

    return (
        <Stack>
            <Card>
                <Stack flexDirection="column">
                    <div style={{fontSize: 25}}>{formatMoney(balance)}</div>
                    <Divider/>
                    <Stack flexDirection="column" gap={4}>
                        <Stack>
                            <div>Кредитный лимит</div>
                            <div style={{flex: "none"}}>{formatMoney(-creditLimit)}</div>
                        </Stack>
                        <Stack>
                            <div>Реальный лимит</div>
                            <div style={{flex: "none"}}>{formatMoney(readableRealBalance)}</div>
                        </Stack>
                    </Stack>
                    <Divider/>
                    <Stack flexDirection="column" gap={4}>
                        <Stack>
                            <div>Месячные расходы</div>
                            <div style={{flex: "none"}}>{formatMoney(-monthCost)}</div>
                        </Stack>
                        <Stack>
                            <div>Остаток</div>
                            <div style={{flex: "none"}}>{formatMoney(additionalMoney)}</div>
                        </Stack>
                    </Stack>
                    <Divider/>
                    <Stack flexDirection="column" gap={4}>
                        <Stack>
                            <div>Зарезервированные расходы</div>
                            <div style={{flex: "none"}}>{formatMoney(-reservesPrice)}</div>
                        </Stack>
                        <Stack>
                            <div>Остаток</div>
                            <div style={{flex: "none"}}>{formatMoney(moneyAfterReserves)}</div>
                        </Stack>
                    </Stack>
                </Stack>

            </Card>
        </Stack>
    )
}

export default ClientInfo;