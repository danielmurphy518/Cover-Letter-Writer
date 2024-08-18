import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import EditRequirementsModal from './EditRequirementsModal'; // New component for editing requirements.txt

const SettingsModal = ({ open, onClose }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleEditModalOpen = () => {
        setIsEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
    };

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Box 
                    sx={{ 
                        width: 300, 
                        padding: 4, 
                        margin: '100px auto', 
                        backgroundColor: 'white', 
                        borderRadius: '8px', 
                        textAlign: 'center'  // Center the content
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Settings
                    </Typography>
                    <Button 
                        variant="contained" 
                        onClick={handleEditModalOpen} 
                        sx={{ marginBottom: 2 }} // Add space between buttons
                    >
                        Edit Keywords
                    </Button>
                    <Button 
                        variant="outlined" 
                        onClick={onClose} 
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
            <EditRequirementsModal open={isEditModalOpen} onClose={handleEditModalClose} />
        </>
    );
};

export default SettingsModal;
