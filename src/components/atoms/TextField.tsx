import React from 'react';
import { TextField as ThirdPartyTextField, TextFieldProps as ThirdPartyTextFieldProps, StandardTextFieldProps, FilledTextFieldProps, OutlinedTextFieldProps } from '@material-ui/core';

type TextFieldProps = StandardTextFieldProps | FilledTextFieldProps | OutlinedTextFieldProps;

const TextField = (props: TextFieldProps) => {
    return (
        <ThirdPartyTextField {...props} />
    )
};

export default TextField