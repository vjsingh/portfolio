import { PageProps } from "gatsby"
import React from "react"
import App from "./App"
import { Helmet } from 'react-helmet';

export default function IndexRoute(props: PageProps) {
  <Helmet>
    <link rel="stylesheet" href="https://use.typekit.net/fru0bow.css"/>
  </Helmet>
  return (
    <App {...props}/>
  )
}
