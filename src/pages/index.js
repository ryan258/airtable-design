import React from 'react'
import { graphql } from 'gatsby'
import {
  Layout,
  Hero,
  About,
  Projects,
  Survey,
  Slider,
  GridProjects,
} from '../components'

const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <h2>gatsby airtable starter</h2>
    </Layout>
  )
}

export default HomePage
