import React from 'react';
import { Box, Typography } from '@mui/material';

const CustomCloudComponent = () => {
    const tags = [
        'HTML', 'CSS', 'JavaScript', 'React', 'UX', 
        'UI', 'SQL', 'YAML', 'JSON', 'Scylla', 
        'Software Development', 'Front-end', 'Back-end', 
        'Node.js', 'Web Development', 'API', 'Database', 
        'Agile', 'Git', 'DevOps', 'Machine Learning'
    ];

    return (
        <Box
            sx={{
                backgroundColor: '#000000',
                height: '200px',
                overflow: 'hidden',
                borderRadius: '8px',
                display: 'flex',             // Use flexbox for layout
                flexWrap: 'wrap',           // Allow tags to wrap
                justifyContent: 'center',    // Center tags horizontally
                alignItems: 'center',        // Center tags vertically
                padding: 2                  // Add padding for better spacing
            }}
        >
            {tags.map((tag, index) => (
                <Typography
                    key={index}
                    sx={{
                        color: '#007FFF',
                        cursor: 'pointer',
                        fontSize: `${Math.random() * 16 + 12}px`, // Random font size
                        margin: '4px',  // Space between tags
                        transition: 'transform 0.2s',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.2)'; // Enlarge on hover
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'; // Reset scale on leave
                    }}
                >
                    {tag}
                </Typography>
            ))}
        </Box>
    );
};

export default CustomCloudComponent;
