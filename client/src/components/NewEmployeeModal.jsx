/* eslint-disable react/prop-types */

import { Button, Checkbox, Label, Modal, Select, TextInput } from 'flowbite-react';

import Form from './Form';

function NewEmployeeModal({ openModal, setOpenModal }) {

    return (
        <>
            <Modal show={openModal} size="lg" popup onClose={() => setOpenModal(false)} >
                <Modal.Header />
                <Modal.Body>
                    <Form />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NewEmployeeModal;