type TitleProps = {
  title: string;
};

const Title = ({ title }: TitleProps) => {
  return (
    <p
      style={{
        alignSelf: "stretch",
        color: "var(--base-white, #FFF)",
        fontFamily: "Inter",
        fontSize: "4rem",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "normal",
      }}
    >
      {title}
    </p>
  );
};
export default Title;
