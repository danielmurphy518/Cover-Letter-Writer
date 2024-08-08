// src/components/ModalForm.js
import React, { useState } from 'react';
import { Modal, Button, Box } from '@mui/material';
import Form from './Form';
import '../App.css'; // Ensure the path is correct

const ModalForm = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFormSubmit = (url) => {
        console.log('Submitted URL:', url);
        // You can add further processing logic here
        handleClose(); // Close the modal after form submission
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
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        maxWidth: 600,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <h2 id="modal-title">Submit URL</h2>
                    <Form onSubmit={handleFormSubmit} />
                </Box>
            </Modal>
        </>
    );
};

export default ModalForm;
