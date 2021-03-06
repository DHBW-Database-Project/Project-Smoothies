import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// Delete button for each row
// endpointUrl is place where to send delete request to
// rowId to identify row
// refetchFunc gets trigger after sending request
// setErrorMessage displays err message when request fails
const DeleteButton = ({ endpointUrl, rowId, refetchFunc, setErrorMessage }) => {
    const options = {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
            rowId: rowId
        })
    }

    const handleDelete = async () => {
        setErrorMessage("")
        const response = await fetch(endpointUrl, options)
        if (response.status == 400) {
            let data = await response.json()
            setErrorMessage(data.message)
        }
        refetchFunc()
    }

    return (
        <Tooltip title="Delete" onClick={() => handleDelete()}>
            <IconButton>
                <DeleteIcon />
            </IconButton>
        </Tooltip>
    )
}

export default DeleteButton