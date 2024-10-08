import React from 'react';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import BugReportIcon from '@mui/icons-material/BugReport';
import DeleteIcon from '@mui/icons-material/Delete'; // Bucket-like icon
import './CustomIconButtons.css'; // You can create a CSS file for styling

function CustomIconButtons() {
  return (
    <div className="icon-button-container">
      <IconButton
        href="#github-placeholder"
        style={{ width: '100px', height: '100px', border: '1px solid gray', color: '#007FFF', marginBottom: '10px' }}
        aria-label="github"
      >
        <GitHubIcon style={{ width: '100%', height: '100%' }} />
      </IconButton>

      <IconButton
        href="#notabug-placeholder"
        style={{ width: '100px', height: '100px', border: '1px solid gray', color: '#007FFF', marginBottom: '10px' }}
        aria-label="notabug"
      >
        <BugReportIcon style={{ width: '100%', height: '100%' }} />
      </IconButton>

      <IconButton
        href="#bitbucket-placeholder"
        style={{ width: '100px', height: '100px', border: '1px solid gray', color: '#007FFF' }}
        aria-label="bitbucket"
      >
        <DeleteIcon style={{ width: '100%', height: '100%' }} />
      </IconButton>
    </div>
  );
}

export default CustomIconButtons;


