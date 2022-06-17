import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import DeleteButton from '../DeleteButton';
import { DataContext } from '../../contexts/DataContext';
import { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

const CustormersTable = () => {
    const { customerData, customerStatus, refetchCustomer } = useContext(DataContext)
    const [errorMessage, setErrorMessage] = useState("")


    // this will switch back to client side rendering
    // this is to evade problem with React v18
    const [isSSR, setIsSSR] = useState(true);
    useEffect(() => {
        setIsSSR(false);  
    }, []);

    return (
        <>
            <Title>Recent Customers</Title>

            {!isSSR && customerStatus === 'loading' && (
                <Typography>Loading data...</Typography>
            )}
            {!isSSR && customerStatus === 'error' && (
                <Typography>Error fetching data</Typography>
            )}

            {!isSSR && customerStatus === "success" && (
            <>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Street</TableCell>
                            <TableCell>Zip Code</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customerData.map(customer => (
                            <TableRow key={customer["id"]}>
                                <TableCell>{customer["id"]}</TableCell>
                                <TableCell>{customer["f_name"]}</TableCell>
                                <TableCell>{customer["l_name"]}</TableCell>
                                <TableCell>{customer["streetname"]}</TableCell>
                                <TableCell>{customer["zip_code"]}</TableCell>
                                <TableCell>{customer["city"]}</TableCell>
                                <TableCell>
                                <DeleteButton
                                    endpointUrl={process.env.CUSTOMER_URL}
                                    rowId={customer["id"]}
                                    refetchFunc={refetchCustomer}
                                    setErrorMessage={setErrorMessage}
                                />
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Typography>{errorMessage}</Typography>
            </>
        )}
        </>
    )
}
export default CustormersTable