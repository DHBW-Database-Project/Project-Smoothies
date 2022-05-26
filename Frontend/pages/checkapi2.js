import React from 'react'
import { useQuery } from 'react-query'

const fetchSuppliers = async () => {
    const res = await fetch(process.env.SUPPLIER_URL)
    return res.json()
}

const fetchPlanets = async (page) => {
    const res = await fetch(process.env.SUPPLIER_URL_TEST)
    return res.json()
}


const checkapi2 = () => {
    const { data: otherName, status } = useQuery("supplier", fetchSuppliers)
    const { data: mock, status: mockStatus } = useQuery("planet", fetchPlanets)
    console.log(mock)

    return (
        <div>
            <p>Suppliers</p>

            {status === 'loading' && (
                <div>Loading data</div>
            )}

            {status === 'error' && (
                <div>Error fetching data</div>
            )}

            {status === 'success' && (
                <div>
                    <p>Data rendered successfully</p>
                    <p>{otherName[0]}</p>
                    {otherName.map(supplier =>
                        <>
                            <p>Supplier Name: {supplier[1]}</p>
                            <p>Supplier category: {supplier[2]}</p>
                            <p>Supplier street: {supplier[3]}</p>
                            <p>Supplier zip code: {supplier[4]}</p>
                            <p>Supplier city: {supplier[5]}</p>
                            <br />
                        </>
                    )}
                </div>
            )}

        </div>
    )
}

export default checkapi2