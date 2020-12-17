import React from 'react';
import { FormControl, FormHelperText, MenuItem, Typography } from '@material-ui/core';
import Select from 'components/atoms/Select';
import Spacer from 'components/atoms/Spacer';
import TextField from 'components/atoms/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { RootState } from 'store/root-reducer';
import { useSelector } from 'react-redux';
import Button from 'components/atoms/Button';
import { useAppDispatch } from 'store/store';
import { addEntry } from 'store/thunks/entry';


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

const AddEntryForm = () => {
    const classes = useStyles();

    const dispatch = useAppDispatch();
    const complex = useSelector((state: RootState) => state.complex);

    const [slot, setSlot] = React.useState<string>(complex.slots[0].id);
    const [name, setName] = React.useState<string>('');

    const handleChangeName = (event: React.ChangeEvent<{ value: unknown }>) => {
        setName(event.target.value as string);
    };

    const handleChangeSlot = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSlot(event.target.value as string);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const selectedSlot = complex.slots.find((_slot) => {
            return _slot.id === slot
        });

        if (!selectedSlot) {
            return false
        };

        const entry = {
            title: name,
            beggining: selectedSlot.position,
            end: selectedSlot.position + 1,
        };

        dispatch(addEntry(entry));

    }

    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Typography variant={"h4"} >Add Entry</Typography>
            <Spacer height={20} />
            <FormControl className={classes.formControl}>
                <TextField label="Name" value={name} onChange={handleChangeName} />
            </FormControl>
            <FormControl className={classes.formControl}>
                <Select
                    value={slot}
                    onChange={handleChangeSlot}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {complex.slots.map((slot) => {
                        
                        const key = slot.id;
                        const value = `Between ${slot.position} and ${slot.position + 1}`
                        return (
                            <MenuItem value={key} key={key}>{value}</MenuItem>
                        )
                    })}
                </Select>
                <FormHelperText>Entry Location</FormHelperText>
            </FormControl>


            <FormControl className={classes.formControl}>
                <Button type="submit">Submit</Button>
            </FormControl>
        </form>
    )
}

export default AddEntryForm