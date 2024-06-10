const formatMoney = (number) => {
    return new Intl.NumberFormat('ua', {style: 'currency', currency: 'UAH'}).format(
        number
    );
}

export default formatMoney;