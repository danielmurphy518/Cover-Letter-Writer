import React, { useState, useEffect, useRef } from 'react';
import { Typography, Button, Box, IconButton } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import UploadIcon from '@mui/icons-material/Upload';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SettingsIcon from '@mui/icons-material/Settings';
import Sidebar from './Sidebar';
import SettingsModal from './SettingsModal';
import { fetchLinks, exportLinks, uploadLinks } from '../api/api';
import '../App.css';

const Main = () => {
    const [links, setLinks] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [settingsOpen, setSettingsOpen] = useState(false); // State to control modal visibility
    const fileInputRef = useRef(null); // Reference to the hidden file input

    useEffect(() => {
        const fetchInitialLinks = async () => {
            try {
                const linksFromServer = await fetchLinks();
                setLinks(linksFromServer);
            } catch (error) {
                console.error('Failed to fetch links:', error);
            }
        };

        fetchInitialLinks();
    }, []);

    const addLink = (newLink) => {
        setLinks((prevLinks) => [...prevLinks, newLink]);
    };

    const handleJobClick = (job) => {
        setSelectedJob(job);
    };

    const handleExport = () => {
        exportLinks().catch((error) => {
            console.error('Error exporting links:', error);
        });
    };

    const handleUploadClick = () => {
        fileInputRef.current.click(); // Trigger the file input click
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            try {
                const updatedLinks = await uploadLinks(file); // Upload the file and get the updated links
                setLinks(updatedLinks); // Reset the state of links with the updated links
                console.log('File uploaded successfully and links updated');
            } catch (error) {
                console.error('Failed to upload file:', error);
            }
        }
    };

    const handleSettingsOpen = () => {
        setSettingsOpen(true);
    };

    const handleSettingsClose = () => {
        setSettingsOpen(false);
    };

    return (
        <div className="main-container">
            <div className="top-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <IconButton onClick={handleSettingsOpen} style={{ marginRight: 'auto' }}>
                    <SettingsIcon />
                </IconButton>
                <Typography variant="h4" style={{ flexGrow: 1, textAlign: 'center' }}>
                    Cover Letter Processor
                </Typography>
                <Box>
                    <Button
                        variant="contained"
                        startIcon={<SaveAltIcon />}
                        size="small"
                        style={{ marginRight: '8px' }}
                        onClick={handleExport}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        endIcon={<UploadIcon />}
                        size="small"
                        onClick={handleUploadClick} // Trigger file input click
                    >
                        Upload
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }} // Hidden file input
                        onChange={handleFileChange}
                    />
                </Box>
            </div>
            <div className="content-wrapper">
                <Sidebar links={links} onJobClick={handleJobClick} addLink={addLink} />
                <div className="content-container">
                    {selectedJob && (
                        <div className="job-details">
                            <Typography variant="h4" align="center" style={{ marginBottom: '16px' }}>
                                {selectedJob.title}
                            </Typography>
                            <Box textAlign="center" mb={2}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    endIcon={<OpenInNewIcon />}
                                    onClick={() => window.open(selectedJob.link, '_blank')}
                                >
                                    Open Link
                                </Button>
                            </Box>
                            <div className="keywords-container" style={{ textAlign: 'center' }}>
                                <Typography variant="h6" gutterBottom>
                                    Keywords Found:
                                </Typography>
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    {Object.entries(selectedJob.found_keywords).map(([keyword, count]) => (
                                        <li key={keyword} style={{ marginBottom: '8px' }}>
                                            <Typography variant="body1">
                                                <strong>{keyword}</strong>: {count}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <SettingsModal open={settingsOpen} onClose={handleSettingsClose} />
        </div>
    );
};

export default Main;
