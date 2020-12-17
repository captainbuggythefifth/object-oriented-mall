import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface AlertDialogProps {
    title: string,
    subTitle: string,
    open: boolean,
    onClose: Function
}

const AlertDialog = ({ open, onClose, title, subTitle }: AlertDialogProps) => {

    return (
        <div>
            <Dialog
                open={open}
                onClose={() => onClose()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {subTitle}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose()} color="primary">
                        OK
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialog