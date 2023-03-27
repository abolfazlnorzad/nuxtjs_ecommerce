const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number)
}
export {formatNumber}