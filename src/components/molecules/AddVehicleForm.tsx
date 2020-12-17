import { FormControl, FormHelperText, InputLabel, MenuItem, Typography } from '@material-ui/core';
import Select from 'components/atoms/Select';
import Spacer from 'components/atoms/Spacer';
import TextField from 'components/atoms/TextField';
import React, { FormEventHandler } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { VehicleTypes } from 'store/complex/vehicle';
import { RootState } from 'store/root-reducer';
import { useSelector } from 'react-redux';
import Button from 'components/atoms/Button';
import { useAppDispatch } from 'store/store';
import { park } from 'store/thunks/vehicle';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 200,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

const AddVehicleForm = () => {
    const classes = useStyles();

    const dispatch = useAppDispatch()

    const [plateNumber, setPlateNumber] = React.useState<string>('');
    const [vehicleType, setVehicleType] = React.useState<VehicleTypes>(VehicleTypes.S);
    const [entry, setEntry] = React.useState<string>('');

    const complex = useSelector((state: RootState) => state.complex);
    
    const handleChangePlateNumber = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPlateNumber(event.target.value as string);
    };

    const handleChangeVehicleType = (event: React.ChangeEvent<{ value: unknown }>) => {
        setVehicleType(event.target.value as VehicleTypes);
    };

    const handleChangeEntry = (event: React.ChangeEvent<{ value: unknown }>) => {
        setEntry(event.target.value as string);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const entryV = complex.entries.find((_entry) => {
            return _entry.id === entry
        });

        if (!entryV) {
            return false
        };

        const vehicle = {
            plateNumber,
            type: vehicleType,
            entry: entryV
        };

        dispatch(park(vehicle));

    }

    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Typography variant={"h4"} >Park</Typography>
            <Spacer height={20} />
            <FormControl className={classes.formControl}>
                <TextField label="Plate Number" value={plateNumber} onChange={handleChangePlateNumber} />
            </FormControl>
            <FormControl className={classes.formControl}>
                <Select
                    value={vehicleType}
                    onChange={handleChangeVehicleType}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {Object.entries(VehicleTypes).map((_vehicleType) => {
                        const [key, value] = _vehicleType;
                        return (
                            <MenuItem value={key} key={key}>{value}</MenuItem>
                        )
                    })}
                </Select>
                <FormHelperText>Vehicle Type</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControl}>
                <Select
                    value={entry}
                    onChange={handleChangeEntry}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {complex.entries.map((_entry) => {
                        const {id, title} = _entry;
                        return (
                            <MenuItem value={id} key={id}>{title}</MenuItem>
                        )
                    })}
                </Select>
                <FormHelperText>Entry Point</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
                <Button type="submit">Submit</Button>
            </FormControl>
        </form>
    )
}

export default AddVehicleForm