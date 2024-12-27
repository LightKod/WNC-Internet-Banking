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

export const customerRegisterSchema = z.object({
    username: z.string({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).trim().min(1, {
        message: "This field is required"
    }).max(100, {
        message: "The content is too long (max: 100 characters)"
    }),
    password: z.string({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).trim().min(6, {
        message: "Password's length must have at least 6 characters"
    }).max(100, {
        message: "Password is too long (max: 100 characters)"
    }).regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number."
    ),
    name: z.string({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).trim().min(1, {
        message: "This field is required"
    }).max(100, {
        message: "The content is too long (max: 100 characters)"
    }),
    email: z.string({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).trim().min(1, {
        message: "This field is required"
    }).max(100, {
        message: "The content is too long (max: 100 characters)"
    }).email({
        message: "Invalid email format"
    }),
    phone: z.string({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).trim().length(10, {
        message: "Invalid phone number"
    })
})

export type CustomerRegisterFormValues = z.infer<typeof customerRegisterSchema>

export const rechargeSchema = z.object({
    infoType: z.enum(["username", "account"], {
        message: "Invalid choice"
    }),
    accountInfo: z.string({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).trim().min(1, {
        message: "This field is required"
    }),
    amount: z.coerce.number({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).int({
        message: "Amount must be an integer"
    }).positive({
        message: "Amount cannot be negative"
    }).min(10000, {
        message: "The minimum amount is 10,000 VND"
    })
}).refine((data) => {
    if(data.infoType === "account")
        return data.accountInfo.length === 12
    return true
}, {
    message: "Invalid account number",
    path: ["accountInfo"]
})

export type RechargeFormValues = z.infer<typeof rechargeSchema>

export const assignEmployeeSchema = z.object({
    username: z.string({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).trim().min(1, {
        message: "This field is required"
    })
})

export type AssignEmployeeFormValues = z.infer<typeof assignEmployeeSchema>

export const changePasswordSchema = z.object({
    oldPassword: z.string({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).trim().min(1, {
        message: "This field is required"
    }),
    newPassword: z.string({
        invalid_type_error: "Invalid data",
        required_error: "This field is required"
    }).trim().min(6, {
        message: "Password's length must have at least 6 characters"
    }).max(100, {
        message: "Password is too long (max: 100 characters)"
    }).regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number."
    )
})

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>