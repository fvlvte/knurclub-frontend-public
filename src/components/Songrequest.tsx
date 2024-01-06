import { useCallback, useEffect, useRef, useState } from "react";
import { default as axios } from "axios";

type SongInfo = {
  mediaBase64: string;
  title: string;
  requestedBy: string;
  coverImage: string;
};
enum SongrequestStates {
  Idle,
  Loading,
  Playing,
  Paused,
  Stopped,
  Error,
}
export const Songrequest: React.FC = () => {
  const [state, setState] = useState<SongrequestStates>(SongrequestStates.Idle);
  const [song, setSong] = useState<SongInfo | null>(null);
  const [timeInfo, setTimeInfo] = useState<number>(0); // [currentTime, duration
  const [duration, setDuration] = useState<number>(0); // [currentTime, duration

  const ref = useRef<HTMLAudioElement>(null);

  const onEnded = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    initPlayback();
  }, [ref]);
  const initPlayback = () => {
    axios
      .get("http://localhost/api/songrequest")
      .then((response) => {
        if (response.status === 200) {
          setState(SongrequestStates.Loading);
          if (ref.current) {
            ref.current.onended = onEnded;
            setSong(response.data);
            ref.current.src = `data:audio/mp3;base64,${response.data.mediaBase64}`;
            ref.current.ontimeupdate = () => {
              setTimeInfo(ref.current?.currentTime ?? 0);
              setDuration(ref.current?.duration ?? 0);
            };
            ref.current.play();
          }
        } else if (response.status === 204) {
          setState(SongrequestStates.Idle);
          setSong(null);
          setTimeInfo(0);
          setDuration(0);
          setTimeout(initPlayback, 1000);
        } else {
          setState(SongrequestStates.Error);
          setTimeout(initPlayback, 1000);
        }
      })
      .catch(() => {
        setState(SongrequestStates.Error);
        setTimeout(initPlayback, 1000);
      });
  };
  const convertToDuration = (seconds: number) => {
    const secondsPart = parseInt(
      Math.floor(seconds % 60).toString(),
    ).toString();
    return `${parseInt(Math.floor(seconds / 60).toString())}:${
      secondsPart.length === 1 ? "0" + secondsPart : secondsPart
    }`;
  };

  useEffect(() => {
    if (ref.current) {
      //ref.current.addEventListener("ended", onEnded);
      initPlayback();
    }
  }, [ref]);
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <img src={song?.coverImage} />
        <h2>{song?.title}</h2>
        <p>
          {song && convertToDuration(timeInfo)}
          {song && "/"}
          {song && convertToDuration(duration)}
        </p>
        <p>{song?.requestedBy}</p>
      </div>
      <audio ref={ref}></audio>
    </div>
  );
};
