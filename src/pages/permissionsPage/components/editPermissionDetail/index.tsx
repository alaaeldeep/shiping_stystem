/* MUI */
import { useMediaQuery } from "@mui/material"; /* rect-form */

/* components */
import EditPermissionDetailsLargeScreen from "./largeScreen";
import EditPermissionDetailsSmallScreen from "./smallScreen";

type EditPermissionDetailsProps = {
    open: boolean;
    roleName: string;
    id: number;
    selectedPermissions: any;
    handleClose: () => void;
};

const EditPermissionDetails = ({
    open,
    handleClose,
    roleName,
    selectedPermissions,
    id,
}: EditPermissionDetailsProps) => {
    /* mobile view */
    const matches = useMediaQuery("(min-width:1070px)");

    return (
        <>
            {matches ? (
                <EditPermissionDetailsLargeScreen
                    open={open}
                    roleName={roleName}
                    handleClose={handleClose}
                    selectedPermissions={selectedPermissions}
                    id={id}
                />
            ) : (
                <EditPermissionDetailsSmallScreen
                    open={open}
                    roleName={roleName}
                    handleClose={handleClose}
                    selectedPermissions={selectedPermissions}
                    id={id}
                />
            )}
        </>
    );
};

export default EditPermissionDetails;
