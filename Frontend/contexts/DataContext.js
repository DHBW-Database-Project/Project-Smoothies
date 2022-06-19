import { createContext } from 'react'
import { useQuery } from 'react-query'

export const DataContext = createContext()

const fetchData = async (url) => {
    const res = await fetch(url)
    return res.json()
}

// Data Context is where all the data query for the table are stored.
const DataContextProvider = (props) => {
    // rename data to supplierDate, status to supplierStatus,...
    const { data: supplierData, status: supplierStatus,
        refetch: refetchSupplier } = useQuery("supplier", () => fetchData(process.env.SUPPLIER_URL), {
            // prevent displaying nothing when querying
            keepPreviousData: true,
        })

    const { data: customerData, status: customerStatus,
        refetch: refetchCustomer } = useQuery("customer", () => fetchData(process.env.CUSTOMER_URL), {
            keepPreviousData: true,
        })

    const { data: productData, status: productStatus,
        refetch: refetchProduct } = useQuery("product", () => fetchData(process.env.PRODUCT_URL), {
            keepPreviousData: true,
        })

    const { data: ingredientData, status: ingredientStatus,
        refetch: refetchIngredient } = useQuery("ingredient", () => fetchData(process.env.INGREDIENT_URL), {
            keepPreviousData: true,
        })

    const { data: categoryData, status: categoryStatus,
        refetch: refetchCategory } = useQuery("category", () => fetchData(process.env.CATEGORY_URL), {
            keepPreviousData: true,
        })

    const { data: orderData, status: orderStatus,
        refetch: refetchOrder } = useQuery("order", () => fetchData(process.env.ORDER_URL), {
            keepPreviousData: true,
        })

    const { data: recipeData, status: recipeStatus,
        refetch: refetchRecipe } = useQuery("recipe", () => fetchData(process.env.RECIPE_URL), {
            keepPreviousData: true,
        })

    const value = {
        supplierData, supplierStatus, refetchSupplier,
        customerData, customerStatus, refetchCustomer,
        productData, productStatus, refetchProduct,
        ingredientData, ingredientStatus, refetchIngredient,
        categoryData, categoryStatus, refetchCategory,
        orderData, orderStatus, refetchOrder,
        recipeData, recipeStatus, refetchRecipe
    }
    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataContextProvider