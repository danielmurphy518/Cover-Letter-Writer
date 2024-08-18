import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import { getRequirements, saveRequirements } from '../api/api';

const EditRequirementsModal = ({ open, onClose }) => {
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const result = await getRequirements();
                setContent(result.content);
            } catch (error) {
                console.error('Failed to fetch requirements.txt:', error);
            }
        };
        if (open) {
            fetchContent();
        }
    }, [open]);

    const handleSave = async () => {
        try {
            await saveRequirements(content);
            alert('File saved successfully');
            onClose();
        } catch (error) {
            console.error('Failed to save requirements.txt:', error);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ width: 400, padding: 4, margin: '100px auto', backgroundColor: 'white', borderRadius: '8px' }}>
                <Typography variant="h6" gutterBottom>
                    Edit Keywords
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={10}
                    variant="outlined"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    margin="normal"
                />
                <Button variant="contained" onClick={handleSave} sx={{ marginRight: 2 }}>
                    Save
                </Button>
                <Button variant="outlined" onClick={onClose}>
                    Cancel
                </Button>
            </Box>
        </Modal>
    );
};

export default EditRequirementsModal;
