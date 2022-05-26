import Title from "./Title"
import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const SuppliersForm = () => {
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
                .then(data => {
                    console.log(data)
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
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default SuppliersForm