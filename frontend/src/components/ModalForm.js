import React, { useState } from 'react';
import { Modal, Button } from '@mui/material';
import Form from './Form';
import { createLink } from '../api/api';
import AddIcon from '@mui/icons-material/Add';
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
            <Button 
                variant="contained" 
                color="primary" 
                startIcon={<AddIcon />} 
                size="small"
                onClick={handleOpen}
            >
                New Job
            </Button>
            <Modal
                open={open}
                onClose={handleClose}  // This should handle closing when clicking outside
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div className="modal-container">
                    <div className="form-wrapper">
                        <Form onSubmit={handleFormSubmit} onClose={handleClose} />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalForm;
