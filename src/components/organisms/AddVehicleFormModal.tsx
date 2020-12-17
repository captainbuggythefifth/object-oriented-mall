import React from 'react';
import Button from 'components/atoms/Button';
import AddVehicleForm from 'components/molecules/AddVehicleForm';
import PaperModal from 'components/molecules/PaperModal';


const AddVehicleFormModal = () => {
    const [open, setOpen] = React.useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button onClick={handleOpen}>Park</Button>
            <PaperModal
                open={open}
                onClose={handleClose}
            >
                <>
                    
                    <AddVehicleForm />
                </>
            </PaperModal>
        </>
    )
};

export default AddVehicleFormModal