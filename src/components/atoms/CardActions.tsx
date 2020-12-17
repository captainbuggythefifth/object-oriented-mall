import React from 'react';
import { CardActions as ThirdPartyCardActions, CardActionsProps as ThirdPartyCardActionsProps } from '@material-ui/core';

interface CardActionsProps extends ThirdPartyCardActionsProps {

}

const CardActions = (props: CardActionsProps) => {
    return (
        <ThirdPartyCardActions {...props} />
    )
};

export default CardActions