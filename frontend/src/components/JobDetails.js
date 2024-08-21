import React from 'react';
import { Typography, Box } from '@mui/material';
import '../Apptest.css';

const JobDetails = ({ job }) => {
    if (!job) {
        return (
            <Typography variant="h6" className="job-details-placeholder">
                Select a job to view details
            </Typography>
        );
    }

    return (
        <Box className="job-details-container">
            <Typography variant="h4" gutterBottom>
                {job.title}
            </Typography>
            <Typography variant="body1">
                {/* Add more job details here */}
            </Typography>
        </Box>
    );
};

export default JobDetails;