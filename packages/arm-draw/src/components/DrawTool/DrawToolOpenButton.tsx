import React, { ButtonHTMLAttributes, FunctionComponent } from 'react'
import { TOGGLE_BUTTON_TITLE } from './config'
import { ToolButton } from './DrawToolControls'

const DrawToolOpenButton: FunctionComponent<
  ButtonHTMLAttributes<HTMLButtonElement>
> = ({ ...otherProps }) => (
  // @ts-ignore
  <ToolButton
    title={TOGGLE_BUTTON_TITLE}
    size={44}
    variant="blank"
    iconSize={44}
    icon={
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
        <g fill="#020202">
          <path d="M237.4 598.8l.4.4L187.1 834l229.7-41 .2.2 417.9-417.9-45.2-45.3-399.2 399.2-74.9 16.3-39.4-39.4 14.1-69.7 402.9-402.9-45.3-45.2z" />
          <path d="M329.536 647.845L718.51 258.87l45.255 45.254L374.79 693.1z" />
        </g>
      </svg>
    }
    isOpen={false}
    {...otherProps}
  />
)

export default DrawToolOpenButton
