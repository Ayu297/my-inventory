import React from "react";
import { Modal, Button } from "flowbite-react";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ConfirmationModal({
  show,
  onClose,
  text,
  yes,
  no,
  onYesClick,
  onNoClick,
}) {
  return (
    <Modal show={show} size="sm" onClose={onClose} popup className="p-0 m-auto bg-gray-700 bg-opacity-60">
      {/* <Modal.Backdrop className="bg-gradient-to-r from-gray-800 to-black opacity-75" /> */}
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <FontAwesomeIcon
            icon={faWarning}
            size="5x"
            className="mb-3 text-gray-500 dark:text-gray-400"
          />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {text}
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="gray" onClick={onYesClick}>
              {yes}
            </Button>
            <Button color="blue" onClick={onNoClick}>
              {no}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
