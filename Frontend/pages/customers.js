import React from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CustomerTable from '../components/customers/customerTable';
import CustomerForm from '../components/customers/customerForm';

const Customers = () => {
    return (
        <div>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <CustomerForm/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <CustomerTable/> 
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Customers