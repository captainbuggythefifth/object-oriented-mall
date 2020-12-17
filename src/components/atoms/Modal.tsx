import React from 'react';
import { Modal as ThirdPartyModal, ModalProps as ThirdPartyModalProps } from '@material-ui/core';

export interface ModalProps extends ThirdPartyModalProps {

}

const Modal = (props: ModalProps) => {
    return (
        <ThirdPartyModal {...props} />
    )
};

export default Modal