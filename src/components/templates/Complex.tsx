import React from "react"
import Grid from "components/atoms/Grid";
import Container from "components/atoms/Container";
import Slot from "components/organisms/Slot";
import { GridList } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "store/root-reducer";
import AddVehicleFormModal from "components/organisms/AddVehicleFormModal";
import { SlotStatus } from "store/complex/slot";
import AddEntryFormModal from "components/organisms/AddEntryFormModal";
import Entry from "components/organisms/Entry";
import { Slot as SlotStore } from 'store/complex/slot';
import { useAppDispatch } from "store/store";
import { unpark } from "store/thunks/vehicle";
import AlertDialog from "components/atoms/AlertDialog";
import { Vehicle, VehicleStatus } from "store/complex/vehicle";
import { calculateFee } from "utils/fee";


const Complex = () => {
    const complex = useSelector((state: RootState) => state.complex);
    const [openFeeDialog, setOpenFeeDialog] = React.useState<boolean>(false);
    const [vehicle, setVehicle] = React.useState<Vehicle | null>(null);
    const dispatch = useAppDispatch()
    const handleClickSlot = async (slot: SlotStore) => {

        await dispatch(unpark(slot));
        // setVehicle(vehicleWithFee);
        const v = complex.vehicles.find((_vehicle) => {
            return _vehicle.slot?.id === slot.id && _vehicle.status === VehicleStatus.in
        });

        if (v) {
            setVehicle(v)
            setOpenFeeDialog(true);
        }
    }

    let fee = 0;

    if (vehicle) {
        fee = calculateFee(vehicle)
    }

    return (
        <>
            <Container style={{
                alignContent: "flex-end"
            }}>
                <Grid>
                    <AddVehicleFormModal />
                    <AddEntryFormModal />
                </Grid>
            </Container>
            <Container style={{
                backgroundColor: "black",
            }}>
                <Grid container={true} spacing={2} alignContent={"flex-end"}>
                    <GridList spacing={4}>
                        {complex.slots.map((slot) => {

                            const entry = complex.entries.find((_entry) => {
                                return _entry.beggining === slot.position
                            });

                            return (
                                <>
                                    <div style={{
                                        margin: 10,
                                        backgroundColor: slot.status === SlotStatus.occupied ? "red" : "green"
                                    }}>
                                        <Slot slot={slot} onClick={handleClickSlot} show={slot.status === SlotStatus.occupied} />
                                    </div>
                                    <div style={{
                                        margin: 10,
                                        backgroundColor: "white"
                                    }}>
                                        {
                                            entry && (
                                                <Entry entry={entry} />
                                            )
                                        }
                                    </div>
                                </>
                            )
                        })}
                    </GridList>
                </Grid>
                <AlertDialog
                    open={openFeeDialog}
                    onClose={() => setOpenFeeDialog(false)}
                    title={`${vehicle?.plateNumber} size ${vehicle?.type}`}
                    subTitle={`Vehicle ${vehicle?.plateNumber} size ${vehicle?.type} has fee of ${fee} PHP`}
                />
            </Container>

        </>
    )
};

export default Complex