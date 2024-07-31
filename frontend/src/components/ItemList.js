import React, { useState } from 'react';
import Form from './Form';

const ItemList = () => {
    const [items, setItems] = useState([]);

    const handleNewItem = (newItem) => {
        setItems((prevItems) => [...prevItems, newItem]);
    };

    return (
        <div>
            <h1>Enter URL</h1>
            <Form onNewItem={handleNewItem} />
            {items.map((item, index) => (
                <div key={index}>
                    <h2>{item.title}</h2>
                    {/* {item.paragraphs.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                    ))} */}
                </div>
            ))}
        </div>
    );
};

export default ItemList;