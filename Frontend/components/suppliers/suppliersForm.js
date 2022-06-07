import Title from "../Title"
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { DataContext } from "../../contexts/DataContext";

const SuppliersForm = () => {
    const { refetchSupplier } = useContext(DataContext)

    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [street, setStreet] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [city, setCity] = useState("")


    // This is to check is field is empty
    // if empty => set true => make field red
    const [nameError, setNameError] = useState(false)
    const [categoryError, setCategoryError] = useState(false)
    const [streetError, setStreetError] = useState(false)
    const [zipcodeError, setZipcodeError] = useState(false)
    const [cityError, setCityError] = useState(false)

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
            supplierName: name,
            supplierCategory: category,
            supplierStreet: street,
            supplierZipcode: zipcode,
            supplierCity: city
        })
    }

    // handling user input before sending request
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")
        setNameError(false)
        setCategoryError(false)
        setStreetError(false)
        setZipcodeError(false)
        setCityError(false)

        if (name === "") {
            setNameError(true);
        }

        if (category === "") {
            setCategoryError(true);
        }

        if (street === "") {
            setStreetError(true);
        }

        if (zipcode === "") {
            setZipcodeError(true);
        }

        if (city === "") {
            setCityError(true);
        }

        // request is sent after all input are valid
        if (name && category && street && zipcode && city) {
            fetch(process.env.SUPPLIER_URL, options)
                .then(data => {
                    if (data.status == "400") {
                        setErrorMessage(data.statusText)
                    }
                    // refetch table data after each request
                    refetchSupplier()
                })
        }
    }
    return (
        <>
            <Title>Add Supplier </Title>
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
                            onChange={(e) => setCategory(e.target.value)}
                            label="Category"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={categoryError}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            onChange={(e) => setStreet(e.target.value)}
                            label="Street"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={streetError}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            onChange={(e) => setZipcode(e.target.value)}
                            label="Zipcode"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={zipcodeError}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            onChange={(e) => setCity(e.target.value)}
                            label="City"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={cityError}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box textAlign="center">
                            <Button
                                type="submit"
                                variant="contained"
                            >
                                Add supplier
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

export default SuppliersForm