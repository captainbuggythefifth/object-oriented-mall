import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from 'components/atoms/CardContent';
import Typography from 'components/atoms/Typography';
import CardActions from 'components/atoms/CardActions';
import Button from 'components/atoms/Button';
import { Slot as SlotStore } from 'store/complex/slot';

interface SlotProps {
    slot: SlotStore,
    onClick?: Function,
    show?: boolean
}

const Slot = ({ slot, onClick = () => { }, show = false }: SlotProps) => {

    const title = `Slot ${slot.position} ${slot.type}`
    return (
        <Card style={{
            backgroundColor: "transparent"
        }}>
            <CardContent>
                <Typography variant="h5">
                    {title}
                </Typography>
            </CardContent>
            {show && (
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={() => onClick(slot)}
                    >Unpark</Button>
                </CardActions>
            )}
        </Card>
    );
}

export default Slot