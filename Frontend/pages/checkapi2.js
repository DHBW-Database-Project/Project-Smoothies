import React from 'react'
import { useQuery } from 'react-query'

const fetchSuppliers = async () => {
    const res = await fetch(process.env.TEST_URL)
    return res.json()
}

// const fetchPlanets = async (page) => {
//     const res = await fetch(process.env.SUPPLIER_URL_TEST)
//     return res.json()
// }


const checkapi2 = () => {
    const { data: otherName, status } = useQuery("supplier", fetchSuppliers)
    // const { data: mock, status: mockStatus } = useQuery("planet", fetchPlanets)
    console.log(otherName)

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
                    {/* <p>{otherName[0]}</p> */}
                    {otherName.map(supplier => (
                        <React.Fragment key={supplier["id"]}>
                            <p>Supplier Name: {supplier["name"]}</p>
                            <p>Supplier category: {supplier["category"]}</p>
                            <p>Supplier street: {supplier["street"]}</p>
                            <p>Supplier zip code: {supplier["zipcode"]}</p>
                            <p>Supplier city: {supplier["city"]}</p>
                            <br />
                        </React.Fragment>
                    ))}
                </div>
            )}

        </div>
    )
}

export default checkapi2