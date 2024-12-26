import ChangePasswordForm from "@/app/ui/components/change_password/change_password_form";

export default function Page() {
    return (
        <div className="flex flex-col gap-y-4">
            <span className="text-2xl font-bold">Change your account's password</span>
            <ChangePasswordForm/>
        </div>
    )
}