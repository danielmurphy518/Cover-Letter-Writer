import { useState, useEffect } from 'react';
import { fetchItems } from '../api/api';

const useFetchItems = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchItems();
                setItems(data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchData();
    }, []);

    return { items, error };
};

export default useFetchItems;
