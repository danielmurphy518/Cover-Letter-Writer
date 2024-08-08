// src/components/Form.js
import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const Form = ({ onSubmit }) => {
    const [url, setUrl] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (url) {
            onSubmit(url);
            setUrl('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <TextField
                label="Enter URL"
                variant="outlined"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                fullWidth
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
};

export default Form;
