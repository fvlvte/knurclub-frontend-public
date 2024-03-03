import {useEffect, useState} from "react";
import AudioController, {AudioState} from "./AudioController.tsx";
import {MOCK_DATA} from "./UOKIK.ts";

const Progress = () => {
    //time w sekundach

    const MOCKUP = MOCK_DATA;


    const [playerState, setPlayerState] = useState<AudioState | null>(null);

    const [progressWidth, setProgressWidth] = useState(0)

    const calculateProgressBarWidth = () => {
        const currTime:number = playerState?.time.current ?? 0;
        const maxTime:number = playerState?.time.duration ?? 0;
        const barElement = document.querySelector(".player-progress-bar-container");
        if(!barElement)return;
        const barWidth:number = barElement.clientWidth;
        setProgressWidth((currTime/maxTime) * barWidth);
    }

    useEffect(() => {
        calculateProgressBarWidth()
    }, [playerState]);

    const secToTime = (secIn:number) => {
        secIn = Math.round(secIn) //nie wiem na chuj połówki sekund xdd
        const h:number  = Math.floor(secIn/3600);
        secIn -= Math.floor(h*3600);
        const m:number  = Math.floor(secIn/60);
        secIn -= Math.floor(m*60);
        const s:number = secIn
        const hString:string = h>9 ? `${h}` : `0${h}`;
        const mString:string = m>9 ? `${m}` : `0${m}`;
        const sString:string = s>9 ? `${s}` : `0${s}`;
        let timeString:string = "";
        timeString+=h>0 ? `${hString}:` : "";
        timeString+= `${mString}:`
        timeString+= `${sString}`

        return timeString
    }

    const containerStyle = {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "flex-start",
        gap: "0.5rem",
        alignSelf: "stretch"
    }

    const timestampStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        alignSelf: "stretch"
    }

    const timestampParagraphStyle = {
        color: "var(--base-white, #FFF)",
        fontFamily: "Inter",
        fontSize: "1.5rem",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "normal"
    }

    const progressBarContainerStyle = {
        width: "100%",
        height: "3px",
        backgroundColor: "gray",
        marginTop: "10px",
        borderRadius: "5px"
    }


    return (
        <div className={"player-progress"} style={containerStyle}>
            <AudioController source={MOCKUP.playerAudioSource} onTimeUpdate={(as: AudioState) => setPlayerState(as)}/>
            <div className={"player-progress-timestamp"} style={timestampStyle}>
                <span style={timestampParagraphStyle}>{secToTime(playerState?.time.current ?? 0)}</span>
                <span style={timestampParagraphStyle}>{secToTime(playerState?.time.duration ?? 0)}</span>
            </div>
            <div className={"player-progress-bar"} style={{width: "90%"}}>
                <div className={"player-progress-bar-container"} style={progressBarContainerStyle}>
                    <span className={"player-progress-bar-progress"} style={{display: "block", backgroundColor: "white", borderRadius: "5px", width: `${progressWidth}px`, height: "100%"}}></span>
                </div>
            </div>
        </div>
    )

}

export default Progress
