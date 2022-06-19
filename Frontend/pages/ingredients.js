import { Paper } from '@mui/material'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Head from 'next/head'
import IngredientForm from '../components/ingredients/ingredientForm'
import IngredientTable from '../components/ingredients/ingredientTable'


const Ingredients = () => {
    return (
        <div>
            <Head>
                <title>Ingredients</title>
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
                            <IngredientForm></IngredientForm>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                            <IngredientTable />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Ingredients