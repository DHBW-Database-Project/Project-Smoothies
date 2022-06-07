import Title from "../Title"
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { DataContext } from "../../contexts/DataContext";

                  
const IngredientForm = () => {
    const { refetchIngredient } = useContext(DataContext)

    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [supplierID, setSupplierID] = useState("")



    // This is to check is field is empty
    // if empty => set true => make field red
    const [nameError, setNameError] = useState(false)
    const [quantityError, setQuantityError] = useState(false)
    const [priceError, setPriceError] = useState(false)
    const [supplierIDError, setSupplierIDError] = useState(false)


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
            ingredientName: name,
            ingredientQuantity: quantity,
            ingredientPrice: price,
            supplierId: supplierID
        })
    }

    // handling user input before sending request
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")
        setNameError(false)
        setQuantityError(false)
        setPriceError(false)
        setSupplierIDError(false)

        if (name === "") {
            setNameError(true);
        }

        if (quantity === "") {
            setQuantityError(true);
        }

        if (price === "") {
            setPriceError(true);
        }

        if (supplierID === "") {
            setSupplierIDError(true);
        }

        // request is sent after all input are valid
        if (name && quantity && price && supplierID) {
            fetch(process.env.INGREDIENT_URL, options)
                .then(data => {
                    if (data.status == "400") {
                        setErrorMessage(data.statusText)
                    }
                    // refetch table data after each request
                    refetchIngredient()
                })
        }
    }
    return (
        <>
            <Title>Add Ingredient </Title>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <TextField
                            onChange={(e) => setName(e.target.value)}
                            label="Name"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={nameError}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            onChange={(e) => setQuantity(e.target.value)}
                            label="Quantity"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={quantityError}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            onChange={(e) => setPrice(e.target.value)}
                            label="Price"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={priceError}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            onChange={(e) => setSupplierID(e.target.value)}
                            label="Supplier ID"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={supplierIDError}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box textAlign="center">
                            <Button
                                type="submit"
                                variant="contained"
                            >
                                Add Ingredient
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

export default IngredientForm