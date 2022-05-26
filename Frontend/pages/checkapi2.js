import React from 'react'
import { useQuery } from 'react-query'

const fetchSuppliers = async () => {
    const res = await fetch("http://localhost:5001/supplier")
    return res.json()
}

const checkapi2 = () => {
    const { data, status } = useQuery("supplier", fetchSuppliers)
    console.log(data)

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
                    <p>{data[0]}</p>
                    {data.map(supplier =>
                        <>
                            <p>Supplier Name: {supplier[1]}</p>
                            <p>Supplier category: {supplier[2]}</p>
                            <p>Supplier street: {supplier[3]}</p>
                            <br />
                        </>
                    )}
                </div>
            )}

        </div>
    )
}

export default checkapi2