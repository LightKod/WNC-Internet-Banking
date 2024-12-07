export const formatAccountNumber = ( accountNumber: string ): string => {
    return accountNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export const formatAccountNumberWithCensored = ( accountNumber: string ): string => {
    return `****${accountNumber.slice(-4)}`
}

export const formatMoney = (moneyString: string): string => {
    return moneyString.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const formatDate = (dateString: string): string => {
    const monthNames: { [key: string]: string } = {
        '01': 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'May',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Aug',
        '09': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec',
    };

    const [year, month, day] = dateString.split('-');
    const monthName = monthNames[month];
    return `${parseInt(day, 10)} ${monthName} ${year}`;
}