import React, { createContext, useState } from 'react'

export const PageNameContext = createContext()

const PageNameContextProvider = (props) => {
    const [pageName, setPageName] = useState("Dashboard")

    const value = { pageName, setPageName }
    return (
        <PageNameContext.Provider value={value}>
            {props.children}
        </PageNameContext.Provider>
    )
}

export default PageNameContextProvider