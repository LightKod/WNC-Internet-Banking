export type BankAccount = {
    accountType: string,
    accountNumber: string,
    balance: string
}

export type Contact = {
    name: string,
    accountNumber: string,
    bankName: string,
    bankCode?: string
}

export const linkedLibraryDict: { [key: string]: {
    name: string,
    accountLength: number
} } = {
    "RSA": {
        name: "Bank A",
        accountLength: 12
    }
}

export const linkedLibraryEnum = ["RSA"] as const

export const BASE_URL = 'http://localhost:80/api'

export type APIResponse = {
    isSuccessful: boolean,
    error?: any,
    data?: any
}

export type PaymentRequest = {
    id: string,
    name: string,
    accountNumber: string,
    createdDate: string,
    amount: string,
    status: string
}

export type DetailedPaymentRequest = {
    id: string,
    creditorAccountNumber: string,
    debtorAccountNumber: string,
    creditorName: string,
    amount: string,
    description: string,
    cancelNote?: string,
    createdDate: string,
    status: string
}

export type Employee = {
    id: string,
    name: string,
    email: string,
    status: string
}

export type Transaction = {
    id: string,
    accountNumber?: string,
    transactionName: string,
    transactionType: string,
    transactionDate: string,
    amount: string,
    isReceive: boolean
}

export const allBanks: { [key: string]: {
    name: string,
    accountLength: number
} } = {
    "RSA": {
        name: "Bank A",
        accountLength: 12
    },
    "PGP": {
        name: "PGP | Bankit!",
        accountLength: 12
    }
}
