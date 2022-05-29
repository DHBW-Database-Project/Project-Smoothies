import '../styles/globals.css'
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import Layout from '../components/layout';
import { useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools'
import PageContextProvider from '../contexts/PageContext';
import DataContextProvider from '../contexts/DataContext';

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <PageContextProvider>
          <DataContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </DataContextProvider>
        </PageContextProvider>
      </Hydrate>
      {/* react query dev tools automatically gets removed on prod*/}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
