import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import Typography from "@mui/material/Typography";
import { DataContext } from "../../contexts/DataContext";
import { useContext, useEffect, useState } from "react";
import DeleteButton from "../DeleteButton";
import moment from 'moment';


const OrdersTable = () => {
    const { orderData, orderStatus, refetchOrder } = useContext(DataContext)
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
            {!isSSR && orderStatus === 'loading' && (
                <Typography>Loading data...</Typography>
            )}
            {!isSSR && orderStatus === 'error' && (
                <Typography>Error fetching data</Typography>
            )}

            {!isSSR && orderStatus === "success" && (
                <>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Customer ID</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderData.map(order => (
                                <TableRow key={order["id"]}>
                                    <TableCell>{order["id"]}</TableCell>
                                    <TableCell>{order["customerId"]}</TableCell>
                                    <TableCell>{moment(order["orderDate"]).format("lll")}</TableCell>
                                    <TableCell>
                                        <DeleteButton
                                            endpointUrl={process.env.ORDER_URL}
                                            rowId={order["id"]}
                                            refetchFunc={refetchOrder}
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
export default OrdersTable