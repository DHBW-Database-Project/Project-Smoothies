import React, { createContext, useState } from 'react'

export const PageContext = createContext()

const PageContextProvider = (props) => {
    const [pageName, setPageName] = useState("Dashboard")

    const value = { pageName, setPageName }
    return (
        <PageContext.Provider value={value}>
            {props.children}
        </PageContext.Provider>
    )
}

export default PageContextProvider