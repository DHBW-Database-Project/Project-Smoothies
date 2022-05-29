import React, { createContext } from 'react'
import { useQuery } from 'react-query'


export const DataContext = createContext()

const fetchSuppliers = async () => {
    const res = await fetch(process.env.SUPPLIER_URL)
    return res.json()
}
// Data Context is where all the data query for the table are stored.
const DataContextProvider = (props) => {
    const { data: supplierData, status: supplierStatus,
        refetch: refetchSupplier } = useQuery("supplier", () => fetchSuppliers(), {
            // prevent displaying nothing when querying
            keepPreviousData: true,
        })

    const value = { supplierData, supplierStatus, refetchSupplier }
    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataContextProvider