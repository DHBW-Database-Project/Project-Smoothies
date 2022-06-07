import React from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ProductsForm from "../components/products/productsForm";
import ProductsTable from "../components/products/productsTable";

const Products = () => {
    return (
        <div>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <ProductsForm />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <ProductsTable/> 
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </div>
    )
}

export default Products