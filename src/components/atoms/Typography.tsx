import React from 'react';
import { Typography as ThirdPartyTypography, TypographyProps as ThirdPartyTypographyProps } from '@material-ui/core';

interface TypographyProps extends ThirdPartyTypographyProps {

}

const Typography = (props: TypographyProps) => {
    return (
        <ThirdPartyTypography {...props} />
    )
};

export default Typography