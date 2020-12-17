import React from 'react';
import Button from 'components/atoms/Button';
import AddEntryForm from 'components/molecules/AddEntryForm';
import PaperModal from 'components/molecules/PaperModal';


const AddEntryFormModal = () => {
    const [open, setOpen] = React.useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button onClick={handleOpen}>Add Entry</Button>
            <PaperModal
                open={open}
                onClose={handleClose}
            >
                <>
                    
                    <AddEntryForm />
                </>
            </PaperModal>
        </>
    )
};

export default AddEntryFormModal