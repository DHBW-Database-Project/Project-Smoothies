import Title from "./Title"
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { DataContext } from "../contexts/DataContext";

const SuppliersForm = () => {
    const { refetchSupplier } = useContext(DataContext)

    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [street, setStreet] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [city, setCity] = useState("")

    const [nameError, setNameError] = useState(false)
    const [categoryError, setCategoryError] = useState(false)
    const [streetError, setStreetError] = useState(false)
    const [zipcodeError, setZipcodeError] = useState(false)
    const [cityError, setCityError] = useState(false)

    const [errorMessage, setErrorMessage] = useState("");

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

        if (name && category && street && zipcode && city) {
            fetch(process.env.SUPPLIER_URL, options)
                // remove console log later!
                .then(data => {
                    if (data.status == "400") {
                        setErrorMessage(data.statusText)
                        console.log(data)
                    }
                    refetchSupplier()
                })
                .catch(error => {
                    console.log(error)
                    setErrorMessage("couldn't process request!")
                })
        }
    }
    return (
        <>
            <Title>Add supplier</Title>
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