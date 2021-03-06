import Title from "../Title";
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { DataContext } from "../../contexts/DataContext";
import DeleteButton from "../DeleteButton";

const SuppliersTable = () => {
    const { supplierData, supplierStatus, refetchSupplier } = useContext(DataContext)
    const [errorMessage, setErrorMessage] = useState("");


    // this will switch back to client side rendering
    // this is to evade problem with React v18
    const [isSSR, setIsSSR] = useState(true);
    useEffect(() => {
        setIsSSR(false);
    }, []);

    return (
        <>
            <Title>Suppliers</Title>

            {!isSSR && supplierStatus === 'loading' && (
                <Typography>Loading data...</Typography>
            )}
            {!isSSR && supplierStatus === 'error' && (
                <Typography>Error fetching data</Typography>
            )}

            {!isSSR && supplierStatus === "success" && (
                <>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Street</TableCell>
                                <TableCell>Zip code</TableCell>
                                <TableCell>City</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {supplierData.map(supplier => (
                                <TableRow key={supplier["id"]}>
                                    <TableCell>{supplier["id"]}</TableCell>
                                    <TableCell>{supplier["name"]}</TableCell>
                                    <TableCell>{supplier["category"]}</TableCell>
                                    <TableCell>{supplier["street"]}</TableCell>
                                    <TableCell>{supplier["zipcode"]}</TableCell>
                                    <TableCell>{supplier["city"]}</TableCell>
                                    <TableCell>
                                        <DeleteButton
                                            endpointUrl={process.env.SUPPLIER_URL}
                                            rowId={supplier["id"]}
                                            refetchFunc={refetchSupplier}
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

export default SuppliersTable