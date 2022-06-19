import Title from "../Title"
import { Button, Grid, MenuItem, TextField, Typography, Select, InputLabel } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { DataContext } from "../../contexts/DataContext";

const ProductsForm = () => {
    const { refetchProduct } = useContext(DataContext)

    const [product_name, setPName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [selling_price, setPrice] = useState("")

    // This is to check is field is empty
    // if empty => set true => make field red
    const [pnameError, setPNameError] = useState(false)
    const [quantityError, setQuantityError] = useState(false)
    const [priceError, setPriceError] = useState(false)

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
            productName: product_name,
            productQuantity: quantity,
            productSellingPrice: selling_price,
        })
    }

    // handling user input before sending request
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")
        setPNameError(false)
        setQuantityError(false)
        setPriceError(false)


        if (product_name === "") {
            setPNameError(true);
        }

        if (quantity === "") {
            setQuantityError(true);
        }


        if (selling_price === "") {
            setPriceError(true);
        }

        // request is sent after all input are valid
        if (product_name && quantity && selling_price) {
            fetch(process.env.CUSTOMER_URL, options)
                .then(data => {
                    if (data.status == "400") {
                        setErrorMessage(data.statusText)
                    }
                    // refetch table data after each request
                    refetchProduct()
                })
        }
    }
    return (
        <>
            <Title>Add Product</Title>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <TextField
                            onChange={(e) => setPName(e.target.value)}
                            label="Product"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={pnameError}
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
                            label="Selling price"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={priceError}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box textAlign="center">
                            <Button
                                type="submit"
                                variant="contained"
                            >
                                Send
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

export default ProductsForm