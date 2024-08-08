import React from 'react';
import { Container, Typography } from '@mui/material';
import ModalForm from './ModalForm';
import '../App.css'; // Ensure the path is correct

const Main = () => {
    return (
        <div className="main-container">
            <Typography variant="h2" gutterBottom>
                Cover Letter Processor
            </Typography>
            <ModalForm />
        </div>
    );
};

export default Main;
