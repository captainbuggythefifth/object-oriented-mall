import React from 'react';
import { makeStyles } from '@material-ui/core';
import Modal, { ModalProps } from 'components/atoms/Modal';

function getModalStyle() {
    const top = 50 //+ rand();
    const left = 50 // + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        //border: '2px solid #000',
        //boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

interface PaperModalProps extends ModalProps {
}

const PaperModal = (props: PaperModalProps) => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    return (
        <Modal {...props} >
            <div style={modalStyle} className={classes.paper}>
                {props.children}
            </div>
        </Modal>
    )
};

export default PaperModal