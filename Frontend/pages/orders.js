import React from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import OrdersTable from '../components/orders/ordersTable';
import OrdersForm from '../components/orders/ordersForm';

const Orders = () => {
    return (
        <div>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <OrdersForm/>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <OrdersTable/> 
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </div>
    )
}

export default Orders