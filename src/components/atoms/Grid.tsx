import { Grid as ThrirdPartyGrid, GridProps as ThrirdPartyGridProps } from '@material-ui/core'

interface GridProps extends ThrirdPartyGridProps {

}

const Grid = (props: GridProps) => {
    return (
        <ThrirdPartyGrid {...props} container={true} />
    )
};

export default Grid