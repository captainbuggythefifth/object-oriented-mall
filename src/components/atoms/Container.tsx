import React from 'react';
import { Container as ThirdPartyContainer, ContainerProps as ThrirdPartyContainerProps } from '@material-ui/core'

interface ContainerProps extends ThrirdPartyContainerProps {

}

const Container = (props: ContainerProps) => {
    return (
        <ThirdPartyContainer {...props} />
    )
};

export default Container