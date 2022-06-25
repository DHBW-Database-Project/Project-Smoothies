import Title from "../Title"
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { DataContext } from "../../contexts/DataContext";

const RecipeForm = () => {
    const { refetchRecipe } = useContext(DataContext)

    const [productID, setProductID] = useState("")
    const [ingredientID, setIngredientID] = useState("")
    const [quantity, setQuantity] = useState("")

    // This is to check is field is empty
    // if empty => set true => make field red
    const [productIDError, setProductIDError] = useState(false)
    const [ingredientIDError, setIngredientIDError] = useState(false)
    const [quantityError, setQuantityError] = useState(false)

    // display error message when request fails
    const [errorMessage, setErrorMessage] = useState("");

    // body of post request for adding row
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
            productId: productID,
            ingredientId: ingredientID,
            quantity: quantity
        })
    }

    // handling user input before sending request
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")
        setProductIDError(false)
        setIngredientIDError(false)
        setQuantityError(false)

        if (productID === "") {
            setProductIDError(true);
        }

        if (ingredientID === "") {
            setIngredientIDError(true);
        }

        if (quantity === "") {
            setQuantityError(true);
        }

        // request is sent after all input are valid
        if (productID && ingredientID && quantity) {
            const response = await fetch(process.env.RECIPE_URL, options)
            if (response.status == 400) {
                let data = await response.json()
                console.log(data)
                setErrorMessage(data.error)
            }
            refetchRecipe()
        }
    }
    return (
        <>
            <Title>Add Recipe </Title>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <TextField
                            onChange={(e) => setProductID(e.target.value)}
                            label="Product ID"
                            type="number"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={productIDError}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            onChange={(e) => setIngredientID(e.target.value)}
                            label="Ingredient ID"
                            type="number"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={ingredientIDError}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            onChange={(e) => setQuantity(e.target.value)}
                            label="Quantity"
                            type="number"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={quantityError}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box textAlign="center">
                            <Button
                                type="submit"
                                variant="contained"
                            >
                                Add Recipe
                            </Button>
                            <Typography mt={2}>
                                {errorMessage}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default RecipeForm