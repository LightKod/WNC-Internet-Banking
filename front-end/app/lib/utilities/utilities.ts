export const formatAccountNumber = ( accountNumber: string ): string => {
    return accountNumber.replace(/\B(?=(\d{4})+(?!\d))/g, ' ')
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

export const splitDatetimeString = (datetimeString: string): string => {
    const [date] = datetimeString.split('T')
    return date
}

export const numberToWords = (numberString: string): string => {
    if (!/^\d+$/.test(numberString)) {
        return ""
    }

    const units = ["", "Thousand", "Million", "Billion", "Trillion"];
    const belowTwenty = [
        "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", 
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", 
        "Eighteen", "Nineteen"
    ];
    const tens = [
        "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    ];

    function threeDigitToWords(num: number): string {
        let result = "";
        const hundred = Math.floor(num / 100);
        const remainder = num % 100;

        if (hundred > 0) {
            result += belowTwenty[hundred] + " Hundred ";
        }

        if (remainder > 0) {
            if (remainder < 20) {
                result += belowTwenty[remainder];
            } else {
                const ten = Math.floor(remainder / 10);
                const unit = remainder % 10;
                result += tens[ten] + (unit > 0 ? " " + belowTwenty[unit] : "");
            }
        }

        return result.trim();
    }

    let number = parseInt(numberString, 10);
    if (number === 0) {
        return "Zero";
    }

    let result = "";
    let unitIndex = 0;

    while (number > 0) {
        const chunk = number % 1000;
        if (chunk > 0) {
            result = threeDigitToWords(chunk) + (units[unitIndex] ? " " + units[unitIndex] : "") + " " + result;
        }
        number = Math.floor(number / 1000);
        unitIndex++;
    }

    return result.trim() + " Vietnam Dong";
}