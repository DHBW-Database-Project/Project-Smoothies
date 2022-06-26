import { DataContext } from "../../contexts/DataContext";
import { useContext, useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import Typography from "@mui/material/Typography";
import DeleteButton from "../DeleteButton";


const RecipeTable = () => {
    const { recipeData, recipeStatus, refetchRecipe } = useContext(DataContext)
    const [errorMessage, setErrorMessage] = useState("");

    // this will switch back to client side rendering
    // this is to evade problem with React v18
    const [isSSR, setIsSSR] = useState(true);
    useEffect(() => {
        setIsSSR(false);
    }, []);

    return (

        <>
            <Title>All Recipes</Title>
            {!isSSR && recipeStatus === 'loading' && (
                <Typography>Loading data...</Typography>
            )}
            {!isSSR && recipeStatus === 'error' && (
                <Typography>Error fetching data</Typography>
            )}

            {!isSSR && recipeStatus === "success" && (
                <>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product ID</TableCell>
                                <TableCell>Ingredient ID</TableCell>
                                <TableCell>Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recipeData.map(recipe => (
                                <TableRow key={recipe["id"]}>
                                    <TableCell align="center">{recipe["productId"]}</TableCell>
                                    <TableCell align="center">{recipe["ingredientId"]}</TableCell>
                                    <TableCell align="center">{recipe["quantity"]}</TableCell>
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
export default RecipeTable