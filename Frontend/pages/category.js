import React from 'react'
import { Paper } from '@mui/material'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Head from 'next/head'
import CategoryForm from '../components/categories/categoryForm'
import CategoryTable from '../components/categories/categoryTable'

const Category = () => {
  return (
    <div>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <CategoryForm />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <CategoryTable/> 
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </div>
  )
}

export default Category