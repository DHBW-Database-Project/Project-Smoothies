import '../styles/globals.css'
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import Layout from '../components/layout';
import PageNameContextProvider from '../contexts/PagenameContext';
import { useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools'
import DataContextProvider from '../contexts/DataContext';

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <PageNameContextProvider>
          <DataContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </DataContextProvider>
        </PageNameContextProvider>
      </Hydrate>
      {/* remove react query dev tools later */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
