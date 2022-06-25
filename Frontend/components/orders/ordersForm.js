import Title from "../Title"
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { DataContext } from "../../contexts/DataContext";

const OrdersForm = () => {
    const { refetchOrder } = useContext(DataContext)

    const [customerID, setCustomerID] = useState("")
    const [date, setDate] = useState("")

    // This is to check is field is empty
    // if empty => set true => make field red
    const [customerIdError, setCustomerIdError] = useState(false)
    const [dateError, setDateError] = useState(false)

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
            customerId: customerID,
            orderDate: date,
        })
    }

    // handling user input before sending request
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")
        setCustomerIdError(false)
        setDateError(false)

        if (customerID === "") {
            setCustomerIdError(true);
        }

        if (date === "") {
            setDateError(true);
        }

        // request is sent after all input are valid
        if (customerID && date) {
            const response = await fetch(process.env.ORDER_URL, options)
            if (response.status == 400) {
                let data = await response.json()
                setErrorMessage(data.error)
            }
            refetchOrder()
        }
    }
    return (
        <>
            <Title>Add Order </Title>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <TextField
                            onChange={(e) => setCustomerID(e.target.value)}
                            label="Customer ID"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={customerIdError}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="datime-local"
                            onChange={(e) => setDate(e.target.value)}
                            label="Date"
                            type="datetime-local"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={dateError}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box textAlign="center">
                            <Button
                                type="submit"
                                variant="contained"
                            >
                                Add Order
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

export default OrdersForm