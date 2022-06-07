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

const IngredientTable = () => {
    const { ingredientData, ingredientStatus, refetchIngredient } = useContext(DataContext)
    const [errorMessage, setErrorMessage] = useState("");


    // this will switch back to client side rendering
    // this is to evade problem with React v18
    const [isSSR, setIsSSR] = useState(true);
    useEffect(() => {
        setIsSSR(false);
    }, []);

    return (
        <>
            <Title>Ingredient</Title>

            {!isSSR && ingredientStatus === 'loading' && (
                <Typography>Loading data...</Typography>
            )}
            {!isSSR && ingredientStatus === 'error' && (
                <Typography>Error fetching data</Typography>
            )}

            {!isSSR && ingredientStatus === "success" && (
                <>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Supplier ID</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ingredientData.map(ingredient => (
                                <TableRow key={ingredient["id"]}>
                                    <TableCell>{ingredient["id"]}</TableCell>
                                    <TableCell>{ingredient["name"]}</TableCell>
                                    <TableCell>{ingredient["quantity"]}</TableCell>
                                    <TableCell align="right">{`$${ingredient["price"]}`}</TableCell>
                                    <TableCell>{ingredient["supplierId"]}</TableCell>
                                    <TableCell>
                                        <DeleteButton
                                            endpointUrl={process.env.INGREDIENT_URL}
                                            rowId={ingredient["id"]}
                                            refetchFunc={refetchIngredient}
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

export default IngredientTable