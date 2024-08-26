import React, { useState, useEffect } from 'react';
import '../Apptest.css';
import { Button } from '@mui/material';
import ModalForm from './ModalForm';
import JobDetails from './JobDetails';
import SettingsModal from './SettingsModal'; // Import the SettingsModal component
import { fetchLinks } from '../api/api';

const Main = () => {
    const [links, setLinks] = useState([]);
    const [filteredLinks, setFilteredLinks] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false); // State for SettingsModal
    const [selectedStatuses, setSelectedStatuses] = useState([]);

    // Update filtered links whenever links or selectedStatuses change
    useEffect(() => {
        filterLinks(links);
    }, [links, selectedStatuses]);

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

    const handleStatusChange = (statuses) => {
        setSelectedStatuses(statuses); // Update selected statuses
    };

    const filterLinks = (linksToFilter) => {
        console.log("Filtering links...");
        console.log("Links to filter:", linksToFilter);
        console.log("Selected statuses:", selectedStatuses);

        if (selectedStatuses.length === 0) {
            setFilteredLinks(linksToFilter);
        } else {
            setFilteredLinks(
                linksToFilter.filter(link => selectedStatuses.includes(link.status))
            );
        }
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
                    <ModalForm addLink={addLink} onStatusChange={handleStatusChange} />
                </div>
                <div className="sidebar-content">
                    {filteredLinks.map((link, index) => (
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
