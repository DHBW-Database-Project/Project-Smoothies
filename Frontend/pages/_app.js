import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from '../components/layout';
import PageNameContextProvider from '../contexts/PagenameContext';

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <PageNameContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PageNameContextProvider>
    </QueryClientProvider>
  )
}

export default MyApp
