import { useEffect, useRef, useState } from "react";
import { default as axios } from "axios";
import { Config } from "../Config";

type SongInfo = {
  mediaBase64: string;
  title: string;
  requestedBy: string;
  coverImage: string;
  userReputation: number;
  url: string;
};

const convertToDuration = (seconds: number) => {
  const secondsPart = parseInt(Math.floor(seconds % 60).toString()).toString();
  return `${parseInt(Math.floor(seconds / 60).toString())}:${
    secondsPart.length === 1 ? "0" + secondsPart : secondsPart
  }`;
};

type V2SRProps = {
  token: string;
};

export const V2SR = ({ token }: V2SRProps) => {
  const [song, setSong] = useState<SongInfo | null>(null);
  const [timeInfo, setTimeInfo] = useState<number>(0); // [currentTime, duration
  const [duration, setDuration] = useState<number>(0); // [currentTime, duration

  const imageRef = useRef<HTMLImageElement>(null);
  const playerRef = useRef<HTMLAudioElement>(null);
  const alertPlayerRef = useRef<HTMLAudioElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  const BOZY_DELAY = 2137;

  const backendUrl = Config.getNewBackendURL();

  const initPlayback = async () => {
    try {
      const response = await axios.get(`${backendUrl}/v1/sr/queue`, {
        headers: { "X-Knur-Key": token },
      });

      if (response.status === 200) {
        if (playerRef.current) {
          playerRef.current.onended = () => {
            initPlayback();
          };

          setSong(response.data);
          playerRef.current.src = `data:audio/mp3;base64,${response.data.mediaBase64}`;
          playerRef.current.ontimeupdate = () => {
            if (
              playerRef.current?.currentTime &&
              playerRef.current?.currentTime > 10
            ) {
              imageRef.current?.classList.add("opacitedxD");
            } else {
              imageRef.current?.classList.remove("opacitedxD");
            }
            setTimeInfo(playerRef.current?.currentTime ?? 0);
            setDuration(playerRef.current?.duration ?? 0);
          };
          playerRef.current.volume = 0.1;
          playerRef.current.play();
        }
      } else if (response.status === 204) {
        setSong(null);

        setTimeInfo(0);
        setDuration(0);
        setTimeout(initPlayback, BOZY_DELAY / 2);
      } else {
        setTimeout(initPlayback, BOZY_DELAY / 2);
      }
    } catch (e) {
      setTimeout(initPlayback, BOZY_DELAY / 2);
    }
  };

  const initAlertPlayback = async () => {
    try {
      const response = await axios.get(`${backendUrl}/v1/sa/queue`, {
        headers: { "X-Knur-Key": token },
      });

      if (response.status === 200) {
        if (alertPlayerRef.current) {
          alertPlayerRef.current.onended = () => {
            initAlertPlayback();
          };

          alertPlayerRef.current.src = `data:audio/mp3;base64,${response.data.mediaBase64}`;
          alertPlayerRef.current.volume = 1;
          alertPlayerRef.current.play();
        }
      } else if (response.status === 204) {
        setTimeout(initAlertPlayback, BOZY_DELAY / 2);
      } else {
        setTimeout(initAlertPlayback, BOZY_DELAY / 2);
      }
    } catch (e) {
      setTimeout(initAlertPlayback, BOZY_DELAY / 2);
    }
  };

  useEffect(() => {
    if (playerRef.current) {
      initPlayback();
    }
    if (alertPlayerRef.current) {
      initAlertPlayback();
    }
  }, [playerRef, alertPlayerRef]);

  useEffect(() => {
    if (!song) return;

    let work = false;

    h1Ref.current?.scrollTo({ left: 0 });

    const ti = window.setInterval(() => {
      if (work) {
        const lastScrollAmount = h1Ref.current?.scrollLeft;

        h1Ref.current?.scrollBy({ left: 1 });
        if (h1Ref.current?.scrollLeft === lastScrollAmount) {
          work = false;
          window.setTimeout(() => {
            h1Ref.current?.scrollTo({ left: 0 });
            setTimeout(() => {
              work = true;
            }, BOZY_DELAY);
          }, BOZY_DELAY);
        }
      }
    }, 1000 / 60);

    window.setTimeout(() => {
      work = true;
    }, BOZY_DELAY);
    return () => {
      work = false;
      window.clearInterval(ti);
    };
  }, [song]);

  useEffect(() => {
    const i = window.setInterval(async () => {
      try {
        const response = await axios.get(`${backendUrl}/v1/sr/playback`, {
          headers: { "X-Knur-Key": token },
        });
        if (response.data.skip) {
          playerRef.current?.pause();
          initPlayback();
        }
      } catch (e_) {
        console.error(e_);
      }
    }, 2000);
    return () => window.clearInterval(i);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        textAlign: "left",
      }}
    >
      <div>
        <img
          alt={"dupa"}
          ref={imageRef}
          style={{ width: "100%", height: "100%" }}
          src={song?.coverImage}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
          }}
        >
          <span style={{ overflowX: "visible" }}>
            <h1
              ref={h1Ref}
              style={{
                width: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {song?.title}
            </h1>
          </span>

          <p>
            {song && convertToDuration(timeInfo)}
            {song && "/"}
            {song && convertToDuration(duration)}
          </p>
          <p>
            {song?.requestedBy} ({song?.userReputation})
          </p>
        </div>
      </div>
      <audio ref={playerRef}></audio>
      <audio ref={alertPlayerRef}></audio>
    </div>
  );
};
