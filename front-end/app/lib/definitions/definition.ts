export type BankAccount = {
    accountType: string,
    accountNumber: string,
    balance: string
}

export type Contact = {
    name: string,
    accountNumber: string,
    bankName: string
}

export const linkedLibraryDict: { [key: string]: {
    name: string,
    accountLength: number
} } = {
    "PGP": {
        name: "Bankit! PGP",
        accountLength: 12
    }
}

export const linkedLibraryEnum = ["PGP"] as const