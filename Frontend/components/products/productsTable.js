import { DataContext } from "../../contexts/DataContext"
import { useContext, useState, useEffect } from "react";
import Title from '../Title';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import DeleteButton from "../DeleteButton";

const ProductsTable = () => {
    const { productData, productStatus, refetchProduct } = useContext(DataContext)
    const [errorMessage, setErrorMessage] = useState("")

    // this will switch back to client side rendering
    // this is to evade problem with React v18
    const [isSSR, setIsSSR] = useState(true);
    useEffect(() => {
        setIsSSR(false);
    }, []);

    return (
        <>
            <Title>Recent Products</Title>

            {!isSSR && productStatus === 'loading' && (
                <Typography>Loading data...</Typography>
            )}
            {!isSSR && productStatus === 'error' && (
                <Typography>Error fetching data</Typography>
            )}

            {!isSSR && productStatus === "success" && (
                <>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Product</TableCell>
                                <TableCell>Selling Price</TableCell>
                                <TableCell align="right">Category ID</TableCell>
                                {/* empty TableCell for delete option */}
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productData.map(product => (
                                <TableRow key={product["id"]}>
                                    <TableCell>{product["id"]}</TableCell>
                                    <TableCell>{product["product_name"]}</TableCell>
                                    <TableCell>{product["quantity"]}</TableCell>
                                    <TableCell align="right">{`$${product["selling_price"]}`}</TableCell>
                                    <TableCell align="right">
                                        <DeleteButton
                                            endpointUrl={process.env.PRODUCT_URL}
                                            rowId={product["id"]}
                                            refetchFunc={refetchProduct}
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
export default ProductsTable