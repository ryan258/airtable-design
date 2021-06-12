import React, { useState } from 'react'
import sublinks from '../constants/links'

// this one we'll use the most, whenever we need to access it because it needs to be passed into useState()
const GatsbyContext = React.createContext()

// Provider && with useContext we don't really need Consumer anymore

// make vvv this component to wrap the whole application
// w/ the provider we get a value prop that we can set whatever values we could want
// this one we'll use only once in the root

const GatsbyProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [links, setLinks] = useState(sublinks)

  return (
    <GatsbyContext.Provider value={{ isSidebarOpen, links }}>
      {children}
    </GatsbyContext.Provider>
  )
}
//! now put the GatsbyProvider into the root-wrapper.js

export { GatsbyContext, GatsbyProvider }
