import { PageProps } from "gatsby"
import React from "react"
import App from "./App"

export default function IndexRoute(props: PageProps) {
  return (
    <App {...props}/>
  )
}
