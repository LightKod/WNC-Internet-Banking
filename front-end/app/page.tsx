'use client'

import Image from "next/image";
import { useRef } from "react";
import Sheet, { SheetRef } from "./ui/components/universal/sheet";
import Modal, { ModalRef } from "./ui/components/universal/modal";
import AlertDialog, { AlertDialogRef } from "./ui/components/universal/alert_dialog";

export default function Home() {
  const modalRef = useRef<SheetRef>(null)

  const openSheet = () => {
    modalRef.current?.openSheet()
  }

  const mRef = useRef<ModalRef>(null)

  const openModal = () => {
    mRef.current?.openModal()
  }

  const dRef = useRef<AlertDialogRef>(null)

  const openDialog = () => {
    dRef.current?.openDialog()
  }

  return (
    <>
      <div>Normal</div>
      <div className="text-sm">Small</div>
      <div className="text-xs">Xs</div>
      <div className="font-medium">Medium</div>
      <div className="font-semibold">Semi-bold</div>
      <div className="font-bold">Bold</div>
      <div className="font-bold">Overview</div>
      <div className="text-gray-500 text-sm">My Wallet</div>
      <div className="text-gray-950 text-2xl font-medium">$24,847,123 VND</div>
      <button onClick={openSheet}>
        Open sheet
      </button>

      <button onClick={openModal}>
        Open modal
      </button>

      <button onClick={openDialog}>
        Open dialog
      </button>

      <Sheet ref={modalRef} size="lg" heading="Something">
        a
      </Sheet>

      <Modal ref={mRef} size="lg" heading="Modal">
        a
      </Modal>

      <AlertDialog ref={dRef} heading="Alert" onConfirm={() => console.log("confirm")}>
        a
      </AlertDialog>
    </>
  );
}
