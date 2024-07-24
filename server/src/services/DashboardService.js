const dbClient = require("../dbClient");
const dayjs = require("dayjs");

class DashboardService {
    async balance() {
        const accountsAggregation = await dbClient.account.aggregate({
            _sum: {
                balance: true,
                creditLimit: true
            }
        })
        const reservesAggregation = await dbClient.reserve.aggregate({
            _sum: {
                price: true
            }
        });
        const reservesTotalCost = reservesAggregation._sum.price;

        const total = accountsAggregation._sum.balance / 100;
        const creditLimit = accountsAggregation._sum.creditLimit / 100;
        const realBalance = total - creditLimit;

        const date = dayjs();
        const previousSalaryDay = date.date() > 10 ? date.date(10) : date.subtract(1, "month").date(10);
        const passedFromPreviousSalary = date.diff(previousSalaryDay, "day");
        const daysInMonth = previousSalaryDay.daysInMonth();
        let daysToTheNextSalary = daysInMonth - passedFromPreviousSalary;
        if (daysToTheNextSalary <= 3 && realBalance >= 50000) {
            daysToTheNextSalary = date.add(1, "month").date(10).diff(date, "day")
        }

        const monthlyExpenses = daysToTheNextSalary * 1000;
        const balanceAfterMonthlyExpenses = realBalance - monthlyExpenses;
        const reservedExpenses = Number(reservesTotalCost || 0);
        const freeBalance = balanceAfterMonthlyExpenses - reservedExpenses;

        return {
            total,
            creditLimit,
            realBalance,
            monthlyExpenses,
            balanceAfterMonthlyExpenses,
            reservedExpenses,
            freeBalance
        };
    }
}

module.exports = DashboardService;