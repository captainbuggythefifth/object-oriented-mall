import React from 'react';
import { Button as ThirdPartyButton, ButtonProps as ThirdPartyButtonProps } from '@material-ui/core';


interface ButtonProps extends ThirdPartyButtonProps {
    title: string
}
const Button = (props: ButtonProps) => {
    return (
        <ThirdPartyButton
            {...props}
            variant="outlined"
            color="primary"
        >
            {props.title}
        </ThirdPartyButton>
    );
};

export default Button