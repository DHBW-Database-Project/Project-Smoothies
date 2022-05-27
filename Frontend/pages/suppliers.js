import { Paper } from '@mui/material'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Head from 'next/head'
import SuppliersForm from '../components/suppliersForm'
import SuppliersTable from '../components/suppliersTable'


const Suppliers = () => {
    return (
        <div>
            <Head>
                <title>Suppliers</title>
            </Head>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper
                            sx={{
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                height: 340,
                            }}
                        >
                            <SuppliersForm />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                            <SuppliersTable />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Suppliers