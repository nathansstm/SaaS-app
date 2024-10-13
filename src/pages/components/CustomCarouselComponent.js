import React from 'react';
import { Box, Typography } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';

const images = [
    'https://img.freepik.com/free-vector/atom-science-biotechnology-purple-vector-neon-graphic_53876-117751.jpg?t=st=1728791288~exp=1728794888~hmac=a84d5ea6082e284a371ca6402874e7f75996355264af5c8ccf447cb84caf465f&w=740',
    'https://img.freepik.com/free-photo/3d-abstract-background-with-low-poly-network-communications-design_1048-15812.jpg?t=st=1728793006~exp=1728796606~hmac=e30bcad27fe6b07171bf513251777d8350613ff70abc2c2a5a878d90ee145cac&w=740',
    'https://img.freepik.com/free-photo/3d-abstract-background-with-network-connections-effect_1048-11665.jpg?t=st=1728791606~exp=1728795206~hmac=84b3ff60c082bebd2c66e8f34ebd4d2086734a094fde16026b6b09aa3b9a40b3&w=740',
];

const headers = ['Create', 'React', 'App'];
const subHeaders = ['Mail', 'Users', 'Service'];

const styles = {
    slide: {
        padding: 0, // Remove padding to ensure full visibility
        height: '60vh', // Set a fixed height for the slides
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden', // Ensure overflow is hidden
        flexDirection: 'column', // Stack the image and text vertically
        width: '100%', // Set width to 100%
    },
    subHeaderContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', // Subheader placed after image content
        height: 'auto', // Dynamic height to fit content
        marginTop: '10px', // Add spacing between the image and subheader
        width: '100%', // Set width to 100%
    }
};

const CustomCarouselComponent = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: 'auto', // Adjust height to fit both image and subheader
                overflow: 'hidden',
            }}
        >
            <SwipeableViews enableMouseEvents>
                {images.map((image, index) => (
                    <Box key={index} sx={styles.subHeaderContainer}>
                        <Box
                            sx={{
                                ...styles.slide,
                                backgroundImage: `url(${image})`, // Set the background image
                                backgroundSize: 'cover', // Cover ensures the image fills the Box
                                backgroundPosition: 'center', // Center the image
                            }}
                        >
                            <Typography
                                variant="h2" // Use h2 styles for headers
                                sx={{
                                    color: '#FFFFFF', // Set text color to white
                                    marginTop: '10px', // Add margin for spacing below the image
                                }}
                            >
                                {headers[index]}
                            </Typography>
                        </Box>
                        {/* Subheader placed UNDER the Box */}
                        <Typography
                            variant="h3" // Use h3 styles for subheaders
                            sx={{
                                color: '#FFFFFF', // Set text color to white
                                marginTop: '10px', // Add margin between Box and subheader
                                textAlign: 'center', // Center align the text
                            }}
                        >
                            {subHeaders[index]}
                        </Typography>
                    </Box>
                ))}
            </SwipeableViews>
        </Box>
    );
};

export default CustomCarouselComponent;
