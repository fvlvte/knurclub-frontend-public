type SubtitleProps = {
    content?: string;
}

const Subtitle = ({content}: SubtitleProps) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "0.5rem",
        }}>
            <p style={{
                color: "rgba(255, 255, 255, 0.65)",
                fontFamily: "Inter",
                fontSize: "2rem",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal"
            }}>{content}</p>

        </div>
    )
}
export default Subtitle;
