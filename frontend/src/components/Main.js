import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import ModalForm from './ModalForm';
import Sidebar from './Sidebar';
import { fetchLinks } from '../api/api';
import '../App.css';

const Main = () => {
    const [links, setLinks] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null); // State to hold the selected job

    // UseEffect to fetch the initial links
    useEffect(() => {
        const fetchInitialLinks = async () => {
            try {
                const linksFromServer = await fetchLinks();
                setLinks(linksFromServer);
            } catch (error) {
                console.error('Failed to fetch links:', error);
            }
        };

        fetchInitialLinks(); // Ensure this function is only called once
    }, []); // Empty dependency array to run once after mount

    const addLink = (newLink) => {
        setLinks((prevLinks) => [...prevLinks, newLink]);
    };

    const handleJobClick = (job) => {
        setSelectedJob(job); // Set the selected job when clicked
    };

    return (
        <div className="main-container">
            <div className="top-bar">
                <Typography variant="h4">Cover Letter Processor</Typography>
            </div>
            <div className="content-wrapper">
                <Sidebar links={links} onJobClick={handleJobClick} />
                <div className="content-container">
                    <ModalForm addLink={addLink} />
                    {selectedJob && (
                        <div className="job-details">
                            <Typography variant="h4">{selectedJob.title}</Typography>
                            <Typography variant="subtitle1">{selectedJob.link}</Typography>
                            <div className="keywords-container">
                                <Typography variant="h6">Keywords Found:</Typography>
                                <ul>
                                    {Object.entries(selectedJob.found_keywords).map(([keyword, count]) => (
                                        <li key={keyword}>
                                            {keyword}: {count}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Main;
