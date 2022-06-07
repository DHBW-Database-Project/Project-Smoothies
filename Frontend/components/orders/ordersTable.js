import React from 'react'
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import { DataContext } from "../../contexts/DataContext";
import { useContext, useEffect, useState } from "react";

const OrdersTable = () => {
    const {orderData, orderDetailData, orderStatus, orderDetailStatus, 
        refetchOrder, refetchOrderDetail} = useContext(DataContext)
        const [errorMessage, setErrorMessage] = useState("");
    
    // this will switch back to client side rendering
    // this is to evade problem with React v18
    const [isSSR, setIsSSR] = useState(true);
    useEffect(() => {
        setIsSSR(false);
    }, []);

    return (
        
        <>
            <Title>Recent Orders</Title>
            {!isSSR && orderStatus && orderDetailStatus === 'loading' && (
                <Typography>Loading data...</Typography>
            )}
            {!isSSR && orderStatus && orderDetailStatus === 'error' && (
                <Typography>Error fetching data</Typography>
            )}

            {!isSSR && orderStatus && orderDetailStatus === "success" && (
            <>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Customer ID</TableCell>
                            <TableCell>Customer Name</TableCell>
                            {/* <TableCell>Product</TableCell> */}
                            <TableCell>Date</TableCell>
                            <TableCell>Ship To</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Invoice Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderData.map(order => (
                            <TableRow key={order["id"]}>
                                <TableCell>{order["customerId"]}</TableCell>
                                <TableCell>{order["customerName"]}</TableCell>
                                <TableCell>{order["orderDate"]}</TableCell>
                                <TableCell>{order["shipTo"]}</TableCell>
                                <TableCell align="right">{`$${order["invoiceAmount"]}`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                    See more orders
                </Link>
            </>      
         )}
        </>
    )
}
export default OrdersTable