import { Close } from '@amsterdam/asc-assets'
import { Button, themeSpacing } from '@amsterdam/asc-ui'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  display: flex;
  padding: ${themeSpacing(4)};
`

const CloseButton = styled(Button)`
  margin-left: auto;
`

export interface DrawerPanelHeaderProps {
  onClose?: () => void
}

const DrawerPanelHeader: FunctionComponent<DrawerPanelHeaderProps> = ({
  children,
  onClose,
}) => {
  return (
    <HeaderContainer>
      <div>{children}</div>
      {onClose && (
        <CloseButton
          variant="blank"
          title="Sluit paneel"
          type="button"
          size={30}
          onClick={onClose}
          icon={<Close />}
        />
      )}
    </HeaderContainer>
  )
}

export default DrawerPanelHeader
