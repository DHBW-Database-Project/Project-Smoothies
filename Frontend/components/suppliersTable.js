import Title from "./Title"
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useQuery } from 'react-query'
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

const fetchSuppliers = async () => {
    const res = await fetch(process.env.SUPPLIER_URL)
    return res.json()
}

const SuppliersTable = () => {
    const { data, status } = useQuery("supplier", () => fetchSuppliers(), {
        keepPreviousData: true
    })

    // this will switch back to client side rendering
    const [isSSR, setIsSSR] = useState(true);
    useEffect(() => {
        setIsSSR(false);
    }, []);

    return (
        <>
            <Title>Suppliers</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Street</TableCell>
                        <TableCell>Zip code</TableCell>
                        <TableCell>City</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!isSSR && status === 'loading' && (
                        <Typography>Loading data</Typography>
                    )}

                    {!isSSR && status === 'error' && (
                        <Typography>Error fetching data</Typography>
                    )}

                    {!isSSR && status === "success" && (
                        data.map(supplier =>
                            <TableRow key={supplier[0]}>
                                <TableCell>{supplier[1]}</TableCell>
                                <TableCell>{supplier[2]}</TableCell>
                                <TableCell>{supplier[3]}</TableCell>
                                <TableCell>{supplier[4]}</TableCell>
                                <TableCell>{supplier[5]}</TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>

            </Table>
        </>
    )
}

export default SuppliersTable