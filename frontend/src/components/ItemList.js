import React, { useState } from 'react';
import Form from './Form';

const ItemList = () => {
    const [response, setResponse] = useState(null);

    const handleNewItem = (newItem) => {
        setResponse(newItem);
        console.log(newItem);
    };

    return (
        <div>
            <h1>Enter URL</h1>
            <Form onNewItem={handleNewItem} />
            {response && (
                <div>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ItemList;
