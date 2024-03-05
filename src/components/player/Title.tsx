type TitleProps = {
  title: string
}

const Title = ({ title }: TitleProps) => {
  return (
    <p
      style={{
        alignSelf: 'stretch',
        color: 'var(--base-white, #FFF)',
        fontFamily: 'Inter',
        fontSize: 'calc(4rem + (100vw - 800px) / 100)',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 'normal',
      }}
    >
      {title}
    </p>
  )
}
export default Title
