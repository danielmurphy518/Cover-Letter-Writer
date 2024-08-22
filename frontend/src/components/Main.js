import React, { useState, useEffect } from 'react';
import '../Apptest.css';
import { Button } from '@mui/material';
import ModalForm from './ModalForm';
import JobDetails from './JobDetails';
import SettingsModal from './SettingsModal'; // Import the SettingsModal component
import { fetchLinks } from '../api/api';

const Main = () => {
    const [links, setLinks] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false); // State for SettingsModal

    const addLink = (newLink) => {
        setLinks((prevLinks) => [...prevLinks, newLink]);
    };

    const handleJobClick = (job) => {
        setSelectedJob(job);
    };

    const handleOpenSettings = () => {
        setIsSettingsModalOpen(true); // Open SettingsModal
    };

    const handleCloseSettings = () => {
        setIsSettingsModalOpen(false); // Close SettingsModal
    };

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

    return (
        <div className="container">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>Job Tracker</h2>
                    <ModalForm addLink={addLink} />
                </div>
                <div className="sidebar-content">
                    {links.map((link, index) => (
                        <Button
                            key={index}
                            variant="outlined"
                            style={{ marginBottom: '10px', width: '100%', textAlign: 'left' }}
                            onClick={() => handleJobClick(link)}
                        >
                            {link.title}
                        </Button>
                    ))}
                </div>
            </div>
            <div className="mainbar">
                {/* Pass the handleOpenSettings function to JobDetails */}
                <JobDetails job={selectedJob} onOpenSettings={handleOpenSettings} />
            </div>
            {/* SettingsModal component */}
            <SettingsModal 
                open={isSettingsModalOpen} 
                onClose={handleCloseSettings} 
            />
        </div>
    );
};

export default Main;
