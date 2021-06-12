import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Layout, Projects, Algolia } from '../components'

//! data is being deconstructed out of the GQL query
const ProjectsPage = ({ data }) => {
  //! we deconstruct a usable alias for nodes out of data
  const {
    allAirtable: { nodes: projects },
  } = data

  return (
    <Wrapper>
      <Layout>
        {/* pass the projects data into the Projects component */}
        <Projects title="Our Projects" projects={projects} page />
        <Algolia />
      </Layout>
    </Wrapper>
  )
}

//! vvv this export will return the data that is passed into ProjectPage ^^^
export const query = graphql`
  {
    allAirtable(
      filter: { table: { eq: "Projects" } }
      sort: { fields: data___date, order: DESC }
    ) {
      nodes {
        id
        data {
          date
          name
          type
          image {
            localFiles {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
              }
            }
          }
        }
      }
    }
  }
`

const Wrapper = styled.main`
  min-height: 100vh;
  background: var(--clr-grey-10);
  nav {
    background: var(--clr-primary-7);
  }
`

export default ProjectsPage
