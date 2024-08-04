import React, { useState, useEffect } from 'react';
import { uploadFile, getFiles, processFile } from '../api/api'; // Import the processFile function

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');
    const [processResult, setProcessResult] = useState(null);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const fileList = await getFiles();
                setFiles(fileList.files);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles();
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!file) return;

        try {
            await uploadFile(file);
            setUploadStatus('File uploaded successfully!');
            setFile(null);
            const fileList = await getFiles();
            setFiles(fileList.files);
        } catch (error) {
            setUploadStatus('Error uploading file');
            console.error('Error uploading file:', error);
        }
    };

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.value);
    };

    const handleProcessFile = async () => {
        if (!selectedFile) return;

        try {
            const result = await processFile(selectedFile);
            setProcessResult(result);
        } catch (error) {
            console.error('Error processing file:', error);
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
            {files.length === 0 ? (
                <p>No files uploaded yet.</p>
            ) : (
                <div>
                    <label htmlFor="fileSelect">Select a file:</label>
                    <select
                        id="fileSelect"
                        value={selectedFile}
                        onChange={handleFileSelect}
                    >
                        <option value="">--Select a file--</option>
                        {files.map((file, index) => (
                            <option key={index} value={file}>
                                {file}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {selectedFile && (
                <div>
                    <p>Selected file: {selectedFile}</p>
                    <button onClick={handleProcessFile}>
                        Process File
                    </button>
                </div>
            )}
            {processResult && (
                <div>
                    <h2>Process Result</h2>
                    <pre>{JSON.stringify(processResult, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
