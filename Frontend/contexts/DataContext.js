import React, { createContext } from 'react'
import { useQuery } from 'react-query'


export const DataContext = createContext()

const fetchSuppliers = async () => {
    const res = await fetch(process.env.SUPPLIER_URL)
    return res.json()
}

const fetchCustomers = async () => {
    const res = await fetch(process.env.CUSTOMER_URL)
    return res.json()
}

const fetchProducts = async () => {
    const res = await fetch(process.env.PRODUCT_URL)
    return res.json()
}

const fetchIngredients = async () => {
    const res = await fetch(process.env.INGREDIENT_URL)
    return res.json()
}

const fetchCategories = async () => {
    const res = await fetch(process.env.CATEGORY_URL)
    return res.json()
}
const fetchOrders = async () => {
    const res = await fetch(process.env.ORDER_URL)
    return res.json()
}

const fetchRecipe = async () => {
    const res = await fetch(process.env.RECIPE_URL)
    return res.json()
}

// Data Context is where all the data query for the table are stored.
const DataContextProvider = (props) => {
    const { data: supplierData, status: supplierStatus,
        refetch: refetchSupplier } = useQuery("supplier", () => fetchSuppliers(), {
            // prevent displaying nothing when querying
            keepPreviousData: true,
        })

    const { data: customerData, status: customerStatus,
        refetch: refetchCustomer } = useQuery("customer", () => fetchCustomers(), {
            // prevent displaying nothing when querying
            keepPreviousData: true,
        })

    const { data: productData, status: productStatus,
        refetch: refetchProduct } = useQuery("product", () => fetchProducts(), {
            // prevent displaying nothing when querying
            keepPreviousData: true,
        })

    const { data: ingredientData, status: ingredientStatus,
        refetch: refetchIngredient } = useQuery("ingredient", () => fetchIngredients(), {
            // prevent displaying nothing when querying
            keepPreviousData: true,
        })

    const { data: categoryData, status: categoryStatus,
        refetch: refetchCategory } = useQuery("category", () => fetchCategories(), {
            // prevent displaying nothing when querying
            keepPreviousData: true,
        })

    const { data: orderData, status: orderStatus,
        refetch: refetchOrder } = useQuery("order", () => fetchOrders(), {
            // prevent displaying nothing when querying
            keepPreviousData: true,
        })

    const { data: recipeData, status: recipeStatus,
        refetch: refetchRecipe } = useQuery("recipe", () => fetchRecipe(), {
            // prevent displaying nothing when querying
            keepPreviousData: true,
        })

    const value = { supplierData, supplierStatus, refetchSupplier, 
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