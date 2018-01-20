import Link from 'next/link';
import Head from 'next/head';
// import fetch from  'whatwg-fetch';
import fetch from "isomorphic-unfetch";
const Index= (props)=>(
    <div>
        <Head>
            <title>this is a test</title>
        </Head>
        {JSON.stringify(props.data) }
        <ul>
            <li>
                <Link href='/'> index</Link>
            </li>
            <li>
                <Link href='/about'>about</Link>
            </li>
        </ul>
        hello world
    </div>
)

export default Index;

Index.getInitialProps = async function () {
    const res = await fetch('https://api.github.com')
    const data = await res.json();
    return {
        data
    }
}

