import React from 'react';

interface SpacerProps {
    height?: number
}

const Spacer = ({height = 10}: SpacerProps) => {
    return (
        <div style={{
            height,
        }} />
    )
};

export default Spacer