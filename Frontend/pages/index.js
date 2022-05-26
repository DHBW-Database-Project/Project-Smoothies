import Head from 'next/head'
import Button from '@mui/material/Button';


export default function Home() {
  return (
    <div>
      <Head>
        <title>Homepage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p>Hello World!</p>
      <Button variant="contained">Text</Button>

    </div>
  )
}
