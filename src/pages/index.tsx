import { PageProps } from "gatsby"
import React from "react"
import App from "./App"
import { Helmet } from 'react-helmet';

export default function IndexRoute(props: PageProps) {
  return (
    <>
      <Helmet>
        <title>Varun Singh</title>
        <link rel="stylesheet" href="https://use.typekit.net/fru0bow.css"/>
        <script data-who='💎 Made with naker.io 💎' src='https://d23jutsnau9x47.cloudfront.net/back/v1.0.9/viewer.js' ></script>
      </Helmet>
      <App {...props}/>
    </>
  )
}
