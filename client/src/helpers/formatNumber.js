const formatNumber = (number) => {
    return new Intl.NumberFormat('ua', {}).format(
        number
    );
}

export default formatNumber;