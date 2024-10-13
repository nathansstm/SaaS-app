import React from 'react';
import { Box } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';

const images = [
    'https://img.freepik.com/free-vector/atom-science-biotechnology-purple-vector-neon-graphic_53876-117751.jpg?t=st=1728791288~exp=1728794888~hmac=a84d5ea6082e284a371ca6402874e7f75996355264af5c8ccf447cb84caf465f&w=740',
    'https://img.freepik.com/free-photo/3d-abstract-background-with-low-poly-network-communications-design_1048-15812.jpg?t=st=1728793006~exp=1728796606~hmac=e30bcad27fe6b07171bf513251777d8350613ff70abc2c2a5a878d90ee145cac&w=740',
    'https://img.freepik.com/free-photo/3d-abstract-background-with-network-connections-effect_1048-11665.jpg?t=st=1728791606~exp=1728795206~hmac=84b3ff60c082bebd2c66e8f34ebd4d2086734a094fde16026b6b09aa3b9a40b3&w=740',
];

const styles = {
    slide: {
        padding: 0, // Remove padding to ensure full visibility
        height: '60vh', // Set a fixed height for the slides
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden', // Ensure overflow is hidden
    },
};

const CustomCarouselComponent = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '60vh',
                overflow: 'hidden',
            }}
        >
            <SwipeableViews enableMouseEvents>
                {images.map((image, index) => (
                    <Box
                        key={index}
                        sx={{
                            ...styles.slide,
                            backgroundImage: `url(${image})`, // Set the background image
                            backgroundSize: 'cover', // Cover ensures the image fills the Box
                            backgroundPosition: 'center', // Center the image
                        }}
                    >
                        {/* Optional: Add content here, such as titles or buttons */}
                    </Box>
                ))}
            </SwipeableViews>
        </Box>
    );
};

export default CustomCarouselComponent;
