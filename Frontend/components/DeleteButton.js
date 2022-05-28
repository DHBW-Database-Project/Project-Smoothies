import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';



const DeleteButton = ({ tableName, rowId }) => {
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

    const handleDelete = () => {
        fetch(process.env.SUPPLIER_URL, options)
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