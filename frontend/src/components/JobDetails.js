import React from 'react';
import { Typography, Box, Chip, IconButton, Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LaunchIcon from '@mui/icons-material/Launch';
import '../Apptest.css';

const JobDetails = ({ job, onOpenSettings }) => {
    const keywords = Object.keys(job?.found_keywords || {});

    const handleOpenLink = () => {
        if (job?.link) {
            window.open(job.link, '_blank');
        }
    };

    return (
        <Box className="job-details-container">
            {/* Sticky header with settings button */}
            <Box className="job-details-header" sx={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white', paddingBottom: '8px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <IconButton 
                    color="primary" 
                    onClick={onOpenSettings}
                    className="settings-button"
                >
                    <SettingsIcon />
                </IconButton>
            </Box>

            {/* Display placeholder or job details */}
            {job ? (
                <Box className="job-content-container">
                    <Typography variant="h4" gutterBottom>
                        {job.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {/* Additional job details can go here */}
                    </Typography>

                    {/* Button to open job.link */}
                    <Box sx={{ marginBottom: '16px' }}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleOpenLink}
                            startIcon={<LaunchIcon />}
                        >
                            Open Job Link
                        </Button>
                    </Box>

                    {/* Keywords */}
                    <Box className="job-keywords-container">
                        {keywords.map((keyword, index) => (
                            <Chip 
                                key={index} 
                                label={keyword} 
                                className="job-keyword-chip"
                                sx={{
                                    backgroundColor: '#1976d2',
                                    color: 'white'
                                }}
                            />
                        ))}
                    </Box>
                    {/* Additional content */}
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                    <p>lorem</p>
                </Box>
            ) : (
                <Typography variant="h6" className="job-details-placeholder">
                    Select a job to view details
                </Typography>
            )}
        </Box>
    );
};

export default JobDetails;
