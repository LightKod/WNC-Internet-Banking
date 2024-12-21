import { z } from "zod";
import { linkedLibraryEnum } from "../definitions/definition";

export const internalTransferSchema = z.object({
    senderAccountNumber: z.string({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).length(15, {
        message: "Invalid account number"
    }),
    receiverAccountNumber: z.string({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).trim().length(12, {
        message: "You must specify a receiver"
    }),
    amount: z.coerce.number({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).int({
        message: "Amount must be an integer"
    }).positive({
        message: "Amount cannot be negative"
    }).min(10000, {
        message: "The minimum amount for a transfer is 10,000 VND"
    }),
    transferNote: z.string({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).min(1, {
        message: "This field is required"
    }).max(500, {
        message: "The content is too long (max: 500 characters)"
    }),
    isSelfFeePayment: z.enum(["true", "false"], {
        message: "Invalid choice"
    })
})

export type InternalTransferFormValues = z.infer<typeof internalTransferSchema>

export const interbankTransferSchema = z.object({
    senderAccountNumber: z.string({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).length(15, {
        message: "Invalid account number"
    }),
    bankCode: z.enum(linkedLibraryEnum, {
        message: "Invalid bank choice"
    }),
    receiverAccountNumber: z.string({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).trim().min(1, {
        message: "You must specify a receiver"
    }),
    amount: z.coerce.number({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).int({
        message: "Amount must be an integer"
    }).positive({
        message: "Amount cannot be negative"
    }).min(10000, {
        message: "The minimum amount for a transfer is 10,000 VND"
    }),
    transferNote: z.string({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).min(1, {
        message: "This field is required"
    }).max(500, {
        message: "The content is too long (max: 500 characters)"
    }),
    isSelfFeePayment: z.enum(["true", "false"], {
        message: "Invalid choice"
    })
})

export type InterbankTransferFormValues = z.infer<typeof interbankTransferSchema>

export const cancelPaymentRequestSchema = z.object({
    paymentRequestId: z.string({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).min(1, {
        message: "This field is required"
    }),
    content:  z.string({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).min(1, {
        message: "This field is required"
    }).max(500, {
        message: "The content is too long (max: 500 characters)"
    })
})

export type CancelPaymentRequestFormValue = z.infer<typeof cancelPaymentRequestSchema>

export const paymentRequestSchema = z.object({
    senderAccountNumber: z.string({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).length(15, {
        message: "Invalid account number"
    }),
    receiverAccountNumber: z.string({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).trim().length(12, {
        message: "You must specify a receiver"
    }),
    amount: z.coerce.number({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).int({
        message: "Amount must be an integer"
    }).positive({
        message: "Amount cannot be negative"
    }).min(10000, {
        message: "The minimum amount for a request is 10,000 VND"
    }),
    requestNote: z.string({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).min(1, {
        message: "This field is required"
    }).max(500, {
        message: "The content is too long (max: 500 characters)"
    })
})

export type PaymentRequestFormValue = z.infer<typeof paymentRequestSchema>