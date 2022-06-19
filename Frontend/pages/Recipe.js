import { Paper } from '@mui/material'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Head from 'next/head'
import RecipeForm from '../components/recipe/recipeForm'
import RecipeTable from '../components/recipe/recipeTable'

const Recipe = () => {
    return (
        <div>
            <Head>
                <title>Recipe</title>
            </Head>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                            <RecipeForm />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                            <RecipeTable />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Recipe