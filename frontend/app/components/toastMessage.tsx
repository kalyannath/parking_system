import { Button, Divider } from "@nextui-org/react";
import { ReactNode } from "react";
import { Toast } from "react-hot-toast";
import toast from "react-hot-toast";
import { CgClose } from "react-icons/cg";

export const ToastMessage = ({ toastType = "success", message, t, canDismiss = true }: { toastType?: "success" | "error", message: string | ReactNode, t: Toast, canDismiss?: boolean }) => {
    return (
        <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } ${toastType === "success" ? "bg-tertiaryBackground/70" : "bg-rose-700/70"} text-white shadow-lg flex justify-center items-center px-[10px] py-[6px] rounded-lg text-xs gap-4 backdrop-blur-sm`}
        >
            <div>
                {message}
            </div>
            {canDismiss && <Divider orientation="vertical" className="bg-white/50" />}
            {canDismiss && <Button size="sm" isIconOnly variant="light" onPress={() => { toast.remove(t.id) }}>
                <CgClose className="h-4 w-4 text-white" />
            </Button>}
        </div>
    )
}

export default ToastMessage;