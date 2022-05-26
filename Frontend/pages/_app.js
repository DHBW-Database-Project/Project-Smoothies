import '../styles/globals.css'
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import Layout from '../components/layout';
import PageNameContextProvider from '../contexts/PagenameContext';
import { useState } from 'react';

// const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <PageNameContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PageNameContextProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
