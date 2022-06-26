import Title from "../Title";
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { DataContext } from "../../contexts/DataContext";
import DeleteButton from "../DeleteButton";

const CategoryTable = () => {
    const { categoryData, categoryStatus, refetchCategory } = useContext(DataContext)
    const [errorMessage, setErrorMessage] = useState("");


    // this will switch back to client side rendering
    // this is to evade problem with React v18
    const [isSSR, setIsSSR] = useState(true);
    useEffect(() => {
        setIsSSR(false);
    }, []);

    return (
        <>
            <Title>Category</Title>

            {!isSSR && categoryStatus === 'loading' && (
                <Typography>Loading data...</Typography>
            )}
            {!isSSR && categoryStatus === 'error' && (
                <Typography>Error fetching data</Typography>
            )}

            {!isSSR && categoryStatus === "success" && (
                <>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categoryData.map(category => (
                                <TableRow key={category["id"]}>
                                    <TableCell>{category["id"]}</TableCell>
                                    <TableCell>{category["name"]}</TableCell>
                                    <TableCell>{category["description"]}</TableCell>
                                    <TableCell>
                                        <DeleteButton
                                            endpointUrl={process.env.CATEGORY_URL}
                                            rowId={category["id"]}
                                            refetchFunc={refetchCategory}
                                            setErrorMessage={setErrorMessage}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Typography>{errorMessage}</Typography>
                </>
            )}
        </>
    )
}

export default CategoryTable