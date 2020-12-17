import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from 'components/atoms/CardContent';
import Typography from 'components/atoms/Typography';
import CardActions from 'components/atoms/CardActions';
import Button from 'components/atoms/Button';
import { Entry as EntryStore } from 'store/complex/entry';

interface EntryProps {
    entry: EntryStore,
    onClick?: Function
}

const Entry = ({entry, onClick = () => {}}: EntryProps) => {
    
    const title = `Entry ${entry.title}`
    return (
        <Card style={{
            backgroundColor: "transparent"
        }}>
            <CardContent>
                <Typography variant="h5">
                    {title}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Entry