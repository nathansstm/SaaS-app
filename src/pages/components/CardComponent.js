// /src/pages/components/CardComponent.js

import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, Collapse } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CardComponent = ({ title, content, actionText, href }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card 
            sx={{
                border: '1px solid gray', 
                borderRadius: '20px', 
                backgroundColor: 'black', 
                color: '#007FFF', 
                marginBottom: '16px'
            }}
        >
            <CardHeader 
                title={title} 
                sx={{ color: '#007FFF' }} 
                action={
                    <ArrowDropDownIcon 
                        onClick={handleExpandClick} 
                        style={{ cursor: 'pointer' }} 
                    />
                }
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {content}
                </CardContent>
            </Collapse>
            <CardActions>
                <a href={href} style={{ color: '#007FFF', textDecoration: 'none' }}>{actionText}</a>
            </CardActions>
        </Card>
    );
};

export default CardComponent;


