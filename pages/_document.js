/* eslint-disable @next/next/no-title-in-document-head */
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="title" content="codeswear" />
        <meta name="description" content="Welcome to CodeSwear, the ultimate destination for all things coding-related! Our online store offers a wide range of products, from programming books and coding courses to programming tools and accessories." />
        <meta name="keywords" content="coding , tshirts, Mugs, ecommerce, hoodies, developers" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        <meta name="author" content="Usman Ahmed" />
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
