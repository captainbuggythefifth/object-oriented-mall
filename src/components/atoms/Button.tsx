import React from 'react';
import { Button as ThirdPartyButton, ButtonProps as ThirdPartyButtonProps } from '@material-ui/core';


interface ButtonProps extends ThirdPartyButtonProps {
    
}
const Button = (props: ButtonProps) => {
    const variant = props.variant ? props.variant : "outlined";
    const color = props.color ? props.color : "primary";
    return (
        <ThirdPartyButton
            {...props}
            variant={variant}
            color={color}
        />
    );
};

export default Button