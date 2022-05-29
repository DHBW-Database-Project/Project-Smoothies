import React, { createContext, useState } from 'react'

export const PageContext = createContext()

// PageContext stored the page name where the user is currently 
// on. It's used to change the headline
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