import Title from "../Title"
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { DataContext } from "../../contexts/DataContext";


const CategoryForm = () => {
    const { refetchCategory } = useContext(DataContext)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    // This is to check is field is empty
    // if empty => set true => make field red
    const [nameError, setNameError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)

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
            categoryName: name,
            categoryDescription: description,
        })
    }

    // handling user input before sending request
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")
        setNameError(false)
        setDescriptionError(false)

        if (name === "") {
            setNameError(true);
        }

        if (description === "") {
            setDescriptionError(true);
        }

        // request is sent after all input are valid
        if (name && description) {
            const response = await fetch(process.env.CATEGORY_URL, options)
            if (response.status == 400) {
                let data = await response.json()
                setErrorMessage(data.error)
            }
            refetchCategory()
        }
    }
    return (
        <>
            <Title>Add Category </Title>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <TextField
                            onChange={(e) => setName(e.target.value)}
                            label="Name"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={nameError}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            onChange={(e) => setDescription(e.target.value)}
                            label="Description"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={descriptionError}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box textAlign="center">
                            <Button
                                type="submit"
                                variant="contained"
                            >
                                Add Category
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

export default CategoryForm