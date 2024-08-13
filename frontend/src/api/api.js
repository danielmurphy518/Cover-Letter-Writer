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
    const data = await response.json();
    
    const foundKeywordsArray = Object.keys(data.found_keywords);
    
    return foundKeywordsArray;
}

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/upload_file`, {  // Adjust the endpoint as necessary
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to upload file');
    }
    return response.json();
};

export const getFiles = async () => {
    const response = await fetch(`${API_URL}/get_files`, {  // Adjust the endpoint as necessary
        method: 'GET',
    });
    console.log(response)
    if (!response.ok) {
        throw new Error('Failed to fetch files');
    }
    return response.json();
};

export const processFile = async (fileName) => {
    const response = await fetch(`${API_URL}/process_file?name=${encodeURIComponent(fileName)}`, {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error('Failed to process file');
    }
    return response.json();
};

export const createLink = async (link) => {
    const response = await fetch(`${API_URL}/links`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link }),
    });
    if (!response.ok) {
        throw new Error('Failed to create link');
    }
    return response.json();
};

export const fetchLinks = async () => {
    const response = await fetch(`${API_URL}/links`, {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error('Failed to fetch links');
    }
    return response.json();
};

export const exportLinks = async () => {
    console.log("test")
    const response = await fetch(`${API_URL}/export`, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Failed to export links');
    }
    console.log(response)
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'links.json');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
};

export const uploadLinks = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload file');
        }

        const data = await response.json();
        console.log(data)
        return data; // Return the updated links from the server
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};