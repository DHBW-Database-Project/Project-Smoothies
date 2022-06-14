import Title from "../Title"
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { DataContext } from "../../contexts/DataContext";

                  
const OrdersForm = () => {
    const { refetchOrder } = useContext(DataContext)

    const [customerID, setCustomerID] = useState("")
    const [customerName, setCustomerName] = useState("")
    const [date, setDate] = useState("")
    const [shipTo, setShipTo] = useState("")
    const [invoiceAmount, setInvoiceAmount] = useState("")

    // This is to check is field is empty
    // if empty => set true => make field red
    const [customerIdError, setCustomerIdError] = useState(false)
    const [customerNameError, setCustomerNameError] = useState(false)
    const [dateError, setDateError] = useState(false)
    const [shipToError, setShipToError] = useState(false)
    const [invoiceAmountError, setInvoiceAmountError] = useState(false)
    
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
            customerName: customerName,
            orderDate: date,
            shipTo: shipTo,
            invoiceAmount: invoiceAmount
        })
    }

    // handling user input before sending request
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")
        setCustomerIdError(false)
        setCustomerNameError(false)
        setDateError(false)
        setShipToError(false)
        setInvoiceAmountError(false)

    
        if (customerID === "") {
            setCustomerIdError(true);
        }

        if (customerName === "") {
            setCustomerNameError(true);
        }

        if (date === "") {
            setDateError(true);
        }

        if (shipTo === "") {
            setShipToError(true);
        }

        if (invoiceAmount === "") {
            setInvoiceAmountError(true);
        }
        // request is sent after all input are valid
        if (customerID && customerName  && date && shipTo &&  invoiceAmount) {
            fetch(process.env.ORDER_URL, options)
                .then(data => {
                    if (data.status == "400") {
                        setErrorMessage(data.statusText)
                    }
                    // refetch table data after each request
                    refetchOrder()
                })
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
                            onChange={(e) => setCustomerName(e.target.value)}
                            label="Customer Name"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={customerNameError}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            onChange={(e) => setDate(Date(e.target.value))}
                            label="Date"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={dateError}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            onChange={(e) => setShipTo(e.target.value)}
                            label="Ship To"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={shipToError}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            onChange={(e) => setInvoiceAmount(e.target.value)}
                            label="Invoice Amount"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={invoiceAmountError}
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