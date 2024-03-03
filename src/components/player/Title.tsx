type TitleProps = {
    title: string;
}

const Title = ({title}: TitleProps) => {
    return <h1 style={{
        alignSelf: "stretch",
        color: "var(--base-white, #FFF)",
        fontFamily: "Inter",
        fontSize: "4rem",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "normal",}}>{title}</h1>;
}
export default Title;
