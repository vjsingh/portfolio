import { PageProps } from "gatsby"
import React from "react"
import App from "./App"
import { Helmet } from 'react-helmet';

export default function IndexRoute(props: PageProps) {
  /*
    <Helmet>
    </Helmet>
  */
  return (
    <App {...props}/>
  )
}
