import React, { useState } from 'react';
import { Modal, Button, Menu, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import Form from './Form';
import { createLink } from '../api/api';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import '../App.css'; // Ensure the path is correct

const statuses = [
    { value: 1, label: 'Not Applied' },
    { value: 2, label: 'Applied' },
    { value: 3, label: 'Accepted' },
    { value: 4, label: 'Rejected' }
];

const ModalForm = ({ addLink, onStatusChange }) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedStatuses, setSelectedStatuses] = useState(statuses.map(status => status.value)); // Set all statuses as selected by default

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleStatusChange = (event) => {
        const { value, checked } = event.target;
        const newStatuses = checked 
            ? [...selectedStatuses, parseInt(value, 10)]
            : selectedStatuses.filter((status) => status !== parseInt(value, 10));

        setSelectedStatuses(newStatuses);
        console.log(newStatuses)
        onStatusChange(newStatuses); // Notify parent component about status changes
    };

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
            <Button
                variant="outlined"
                color="secondary"
                startIcon={<FilterListIcon />}
                size="small"
                onClick={handleMenuOpen}
                sx={{ 
                    marginTop: '8px', // Add top margin for spacing
                    padding: '6px 16px' // Ensure consistent padding
                }}
            >
                Open Filters
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {statuses.map((status) => (
                    <MenuItem key={status.value}>
                        <FormControlLabel
                            control={<Checkbox 
                                checked={selectedStatuses.includes(status.value)} 
                                onChange={handleStatusChange} 
                                value={status.value}
                            />}
                            label={status.label}
                        />
                    </MenuItem>
                ))}
            </Menu>
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
