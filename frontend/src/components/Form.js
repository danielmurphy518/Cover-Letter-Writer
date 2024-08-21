import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const Form = ({ onSubmit, onClose }) => {
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
            <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                <Button type="submit" variant="contained" color="primary" style={{ flex: 1 }}>
                    Submit
                </Button>
                <Button type="button" variant="outlined" color="secondary" onClick={onClose} style={{ flex: 1 }}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default Form;
