import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from '../components/layout';

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  )
}

export default MyApp
