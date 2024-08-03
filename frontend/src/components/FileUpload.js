import React, { useState, useEffect } from 'react';
import { uploadFile, getFiles } from '../api/api'; // Import both API functions

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const fileList = await getFiles(); // Fetch the list of files
                setFiles(fileList.files); // Update the state with the file list
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles(); // Fetch files when the component mounts
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!file) return;

        try {
            await uploadFile(file); // Upload the file
            setUploadStatus('File uploaded successfully!');
            setFile(null); // Clear the file after successful upload
            // Fetch the updated list of files
            const fileList = await getFiles();
            setFiles(fileList.files); // Update the state with the new file list
        } catch (error) {
            setUploadStatus('Error uploading file');
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <label>
                Upload file:
                <input
                    type="file"
                    onChange={handleFileChange}
                />
            </label>
            <button onClick={handleFileUpload} disabled={!file}>
                Upload
            </button>
            {uploadStatus && <p>{uploadStatus}</p>}
            <h2>Uploaded Files</h2>
            <ul>
                {files.length === 0 ? (
                    <p>No files uploaded yet.</p>
                ) : (
                    files.map((file, index) => (
                        <li key={index}>{file}</li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default FileUpload;
