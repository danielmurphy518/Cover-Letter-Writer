import React from 'react';
import { List, ListItem, ListItemText, Box } from '@mui/material';
import '../App.css';
import ModalForm from './ModalForm';

const Sidebar = ({ links, onJobClick, addLink }) => {
    return (
        <div className="sidebar-container">
<Box 
  className="add-link-box" 
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
    borderBottom: '2px solid',
    borderColor: 'primary.main',
  }}
>
  <ModalForm addLink={addLink} />
</Box>
            <List className="link-list">
                {links.map((link, index) => (
                    <ListItem
                        key={index}
                        className="link-item"
                        button
                        onClick={() => onJobClick(link)} // Handle job click
                        style={{ borderBottom: '1px solid #34495e' }} // Adding border to each item
                    >
                        <ListItemText primary={link.title} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Sidebar;
