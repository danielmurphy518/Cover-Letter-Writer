const API_URL = 'http://localhost:5001/api';

export const fetchItems = async () => {
    const response = await fetch(`${API_URL}/items`);
    if (!response.ok) {
        throw new Error('Failed to fetch items');
    }
    return response.json();
};

export const createItem = async (name) => {
    const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });
    if (!response.ok) {
        throw new Error('Failed to create item');
    }
    return response.json();
};

export const processLink = async (link) => {
    const response = await fetch(`${API_URL}/link`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link }),
    });
    if (!response.ok) {
        throw new Error('Failed to create item');
    }
    return response.json();
}
