"use client"

import { Modal, ModalContent, ModalHeader, Button } from "@nextui-org/react";
import { ReactNode } from "react";
import { TfiClose } from "react-icons/tfi";
const Dialog = (
    { isOpen, onClose, headerTitle, modalBody, isSubmitting }:
    { isOpen: boolean,  onClose: () => void, headerTitle: string | ReactNode, modalBody: ReactNode, isSubmitting: boolean }
) => {

    return (
        <Modal isDismissable={!isSubmitting} size="4xl" radius="sm" backdrop={"blur"} isOpen={isOpen} onClose={onClose} hideCloseButton scrollBehavior={"inside"}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="py-2 px-4 flex justify-between items-center bg-tertiaryBackground text-white rounded-t-lg">
                            {headerTitle}
                            <Button isDisabled={isSubmitting} size='sm' variant='light' isIconOnly onPress={onClose}>
                                <TfiClose size={12} color='white' />
                            </Button>
                        </ModalHeader>
                        {modalBody}
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default Dialog;