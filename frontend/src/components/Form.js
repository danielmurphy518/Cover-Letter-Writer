import React, { useState } from 'react';
import { processLink } from '../api/api';

const Form = ({ onNewItem }) => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const newItem = await processLink(url);
            onNewItem(newItem);
            setUrl('');
            setError(null);
        } catch (error) {
            setError('Failed to process URL');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                URL:
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Submit</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Form;