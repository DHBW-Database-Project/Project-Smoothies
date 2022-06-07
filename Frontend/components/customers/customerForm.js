
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import Title from "../Title";

const CustomerForm = () => {
    const {refetchCustomer } = useContext(DataContext);

    const [l_name, setLName] = useState("")
    const [f_name, setFName] = useState("")
    const [streetname, setStreet] = useState("")
    const [zip_code, setZipcode] = useState("")
    const [city, setCity] = useState("")


    // This is to check is field is empty
    // if empty => set true => make field red
    const [lnameError, setLNameError] = useState(false)
    const [fnameError, setFNameError] = useState(false)
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
            customerFName: f_name,
            customerLName: l_name,
            customerStreet: streetname,
            customerZipcode: zip_code,
            customerCity: city
        })
    }

    // handling user input before sending request
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")
        setLNameError(false)
        setFNameError(false)
        setStreetError(false)
        setZipcodeError(false)
        setCityError(false)

        if (f_name === "") {
            setFNameError(true);
        }

        if (l_name === "") {
            setLNameError(true);
        }


        if (streetname === "") {
            setStreetError(true);
        }

        if (zip_code === "") {
            setZipcodeError(true);
        }

        if (city === "") {
            setCityError(true);
        }

        // request is sent after all input are valid
        if (f_name && l_name && streetname && zip_code && city) {
            fetch(process.env.CUSTOMER_URL, options)
                .then(data => {
                    if (data.status == "400") {
                        setErrorMessage(data.statusText)
                    }
                    // refetch table data after each request
                   
                    refetchCustomer()
                })
        }
    }
    return (
        <>
            <Title>Add Customer</Title>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <TextField
                            onChange={(e) => setFName(e.target.value)}
                            label="Firtname"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={fnameError}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            onChange={(e) => setLName(e.target.value)}
                            label="Lastname"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={lnameError}
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

export default CustomerForm