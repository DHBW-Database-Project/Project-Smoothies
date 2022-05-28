import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const DeleteButton = ({ tableName, rowId }) => {
    const handleDelete = () => {
        console.log(tableName, rowId)
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