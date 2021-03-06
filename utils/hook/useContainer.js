import React, { useContext, useState } from 'react'
import { Container } from '@material-ui/core'
import ContainerContext from 'utils/context/ContainerContext'

export function ContainerProvider({ children }) {
  const [hasContainer, setHasContainer] = useState(true)

  const Wrapper = hasContainer ? Container : React.Fragment

  return (
    <ContainerContext.Provider value={{ hasContainer, setHasContainer }}>
      <Wrapper>{children}</Wrapper>
    </ContainerContext.Provider>
  )
}

export function useContainer() {
  return useContext(ContainerContext)
}
