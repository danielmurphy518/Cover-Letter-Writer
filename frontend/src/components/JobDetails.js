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

    // Define the status color and label based on the job status
    const getStatusInfo = (status) => {
        switch (status) {
            case 1:
                return { color: 'gray', label: 'Not Applied' };
            case 2:
                return { color: 'yellow', label: 'Applied' };
            case 3:
                return { color: 'green', label: 'Accepted' };
            case 4:
                return { color: 'red', label: 'Rejected' };
            default:
                return { color: 'gray', label: 'Unknown' };
        }
    };

    const { color, label } = getStatusInfo(job?.status);

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
                <Box className="job-content-container" sx={{ textAlign: 'center' }}> {/* Center content */}
                    <Typography variant="h4" gutterBottom>
                        {job.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {/* Additional job details can go here */}
                    </Typography>

                    {/* Button to open job.link */}
                    <Box sx={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
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
                    <Box className="job-keywords-container" sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
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

                    {/* Job status */}
                    {job.status !== undefined && (
                        <Box
                            sx={{
                                marginTop: '16px',
                                padding: '8px',
                                borderRadius: '4px',
                                backgroundColor: color,
                                color: 'black', // Changed to black for better contrast
                                display: 'inline-block'
                            }}
                        >
                            <Typography variant="body1">
                                Status: {label}
                            </Typography>
                        </Box>
                    )}
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
