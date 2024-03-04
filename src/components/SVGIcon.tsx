import React, { CSSProperties, HTMLAttributes } from 'react'

type LogoProps = {
  Icon: React.FC<{ style?: CSSProperties }>
  style?: CSSProperties
  iconStyle?: CSSProperties
} & Partial<HTMLAttributes<unknown>>
export const SVGIcon = ({
  Icon,
  iconStyle,
  style,
  className,
  onClick,
}: LogoProps) => {
  return (
    <div onClick={onClick} className={className} style={style}>
      <Icon style={iconStyle} />
    </div>
  )
}
