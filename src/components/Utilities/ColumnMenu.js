import {
    GridColumnMenuContainer, 
    GridFilterMenuItem, 
    SortGridMenuItems
} from '@mui/x-data-grid';

const CustomColumnMenu = (props) => {
    const { hideMenu, currentColumn } = props;
    return (
        <GridColumnMenuContainer
            hideMenu={hideMenu}
            currentColumn={currentColumn}
        >
            <SortGridMenuItems onClick={hideMenu} column={currentColumn} />
        </GridColumnMenuContainer>
    );
};

export default CustomColumnMenu;