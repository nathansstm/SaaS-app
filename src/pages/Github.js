import React, { useEffect, useState } from 'react';
import CardComponent from './components/CardComponent';
import yaml from 'js-yaml';
import { subdomain } from './domain.config'; // Import the subdomain

const Github = () => {
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://${subdomain}.freemyip.com:5000/content.yaml`; // Build the URL dynamically
                const response = await fetch(url);
                if (!response.ok) throw new Error('Network response was not ok');
                const text = await response.text();
                const data = yaml.load(text);
                setCardData(data);
            } catch (error) {
                console.error('Error fetching YAML data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {Array.isArray(cardData) && cardData.map((card, index) => (
                <CardComponent
                    key={index}
                    title={card.title}
                    content={card.content}
                    actionText={card.actionText}
                    href={card.href}
                />
            ))}
        </div>
    );
};

export default Github;
