const formatCurrency = (number) => {
    return new Intl.NumberFormat('ua', {style: 'currency', currency: 'UAH'}).format(
        number
    );
}

export default formatCurrency;