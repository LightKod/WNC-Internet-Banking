export const formatAccountNumber = ( accountNumber: string ): string => {
    return accountNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export const formatMoney = (moneyString: string): string => {
    return moneyString.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}