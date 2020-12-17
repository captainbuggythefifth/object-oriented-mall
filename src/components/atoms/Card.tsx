import React from 'react';
import { Card as ThirdPartyCard, CardProps as ThirdPartyCardProps } from '@material-ui/core';

interface CardProps extends ThirdPartyCardProps {

}

const Card = (props: CardProps) => {
    return (
        <ThirdPartyCard {...props} />
    )
};

export default Card