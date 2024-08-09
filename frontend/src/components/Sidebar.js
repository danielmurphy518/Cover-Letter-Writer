import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import '../App.css';
import ModalForm from './ModalForm';

const Sidebar = ({ links, onJobClick }) => {
    
    return (
        <div className="sidebar-container">

            <List className="link-list">
                {links.map((link, index) => (
                    <ListItem
                        key={index}
                        className="link-item"
                        button
                        onClick={() => onJobClick(link)} // Handle job click
                    >
                        <ListItemText primary={link.title} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Sidebar;
