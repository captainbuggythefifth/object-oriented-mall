import React from 'react';
import { Select as ThirdPartySelect, SelectProps as ThirdPartySelectProps } from '@material-ui/core';

interface SelectProps extends ThirdPartySelectProps {

}

const Select = (props: SelectProps) => {
    return (
        <ThirdPartySelect {...props} />
    )
};

export default Select