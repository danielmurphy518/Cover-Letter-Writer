import React, { useState } from 'react';
import { Modal, Button, Box } from '@mui/material';
import Form from './Form';
import { createLink } from '../api/api';
import '../App.css'; // Ensure the path is correct

const ModalForm = ({ addLink }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFormSubmit = async (url) => {
        console.log('Submitted URL:', url);
        const newLink = await createLink(url);
        addLink(newLink);  // Update the links state in the parent component
        handleClose();  // Close the modal after form submission
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Add a Job Link
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div className="modal-container">
                    <div className="form-wrapper">
                        <Form onSubmit={handleFormSubmit} />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalForm;
