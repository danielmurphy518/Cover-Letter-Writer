import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'; // Import the info icon
import { getRequirements, saveRequirements } from '../api/api';

const EditRequirementsModal = ({ open, onClose }) => {
    const [content, setContent] = useState('');
    const [infoOpen, setInfoOpen] = useState(false); // State for info modal

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
        <>
            <Modal open={open} onClose={onClose}>
                <Box sx={{ width: 400, padding: 4, margin: '100px auto', backgroundColor: 'white', borderRadius: '8px' }}>
                    <Box display="flex" alignItems="center">
                        <Typography variant="h6" gutterBottom sx={{ display: 'inline' }}>
                            Edit Keywords
                        </Typography>
                        {/* Info icon button with manual positioning */}
                        <IconButton 
                            size="small" 
                            sx={{ 
                                marginLeft: '8px', 
                                padding: 0, 
                                position: 'relative', 
                                top: '-5px' // Manually shift the icon up
                            }} 
                            onClick={() => setInfoOpen(true)}
                        >
                            <InfoOutlinedIcon sx={{ fontSize: '20px' }} />
                        </IconButton>
                    </Box>
                    <TextField
                        fullWidth
                        multiline
                        rows={10}
                        variant="outlined"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        margin="normal"
                    />
                    <Button 
                        variant="contained" 
                        onClick={handleSave} 
                        fullWidth 
                        sx={{ 
                            marginBottom: 1 // Add some space between the buttons if needed
                        }}>
                        Save
                    </Button>
                    <Button 
                        variant="outlined" 
                        onClick={onClose} 
                        fullWidth>
                        Cancel
                    </Button>

                </Box>
            </Modal>

            {/* Info Modal */}
            <Modal open={infoOpen} onClose={() => setInfoOpen(false)}>
                <Box sx={{ width: 300, padding: 4, margin: '100px auto', backgroundColor: 'white', borderRadius: '8px' }}>
                    <Typography variant="h6" gutterBottom>
                        Information
                    </Typography>
                    <Typography variant="body1">
                        Here you can edit the keywords. These keywords are used to match specific job requirements with your resume.
                    </Typography>
                    <Button variant="contained" onClick={() => setInfoOpen(false)} sx={{ marginTop: 2 }}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default EditRequirementsModal;
