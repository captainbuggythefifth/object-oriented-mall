import React from 'react';
import { CardContent as ThirdPartyCardContent, CardContentProps as ThirdPartyCardContentProps } from '@material-ui/core';

interface CardContentProps extends ThirdPartyCardContentProps {

}

const CardContent = (props: CardContentProps) => {
    return (
        <ThirdPartyCardContent {...props} />
    )
};

export default CardContent