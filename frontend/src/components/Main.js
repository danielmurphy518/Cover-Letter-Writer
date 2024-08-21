import React, { useState, useEffect, useRef } from 'react';
import '../Apptest.css';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import ModalForm from './ModalForm';
import JobDetails from './JobDetails';
import { fetchLinks } from '../api/api';

const Main = () => {
    const [links, setLinks] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const fileInputRef = useRef(null); 

    const addLink = (newLink) => {
        setLinks((prevLinks) => [...prevLinks, newLink]);
    };

    const handleJobClick = (job) => {
        setSelectedJob(job);
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
                <JobDetails job={selectedJob} />
            </div>
        </div>
    );
};

export default Main;
