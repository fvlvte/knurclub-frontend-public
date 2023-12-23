import { useEffect, useState } from "react";

interface TournamentQuestionProps {
  onResult: (user: string, points: number) => void;
  answers: string[];
  question: string;
  participants: string[];
  questionIndex: number;
  correctAnswer: string;
  questionTotal: number;
  pointTable: { [user: string]: number };
}
export default function TournamentQuestionView(props: TournamentQuestionProps) {
  const bonusPoints = 2;
  const [renderState, setRenderState] = useState(0);
  const [person, setPerson] = useState<string>("");
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isSelectedAnswerCorrect, setIsSelectedAnswerCorrect] =
    useState<boolean>(false);
  const [isCliffhanger, setIsCliffhanger] = useState<boolean>(true);

  const [participantsSplits, setParticipantsSplits] = useState<string[][]>([]);

  useEffect(() => {
    const ppcopy: string[] = [...props.participants].sort((e, e2) => {
      const e1Points = (props.pointTable[e] || 0) + bonusPoints;
      const e2Points = (props.pointTable[e2] || 0) + bonusPoints;
      return e2Points - e1Points;
    });
    const newSplits: string[][] = [];

    while (ppcopy.length > 0) {
      newSplits.push(ppcopy.splice(0, 4));
    }
    setParticipantsSplits(newSplits);
  }, [props]);

  const handleUserPress = (p: string) => {
    setRenderState(1);
    setPerson(p);
  };

  const handleAnswerCliffHanger = (answer: string) => {
    if (selectedAnswer.length == 0) {
      setSelectedAnswer(answer);
    } else {
      setIsCliffhanger(false);
      setIsSelectedAnswerCorrect(answer === props.correctAnswer);
    }
  };

  const handleResults = () => {
    props.onResult(person, isSelectedAnswerCorrect ? 1 : -2);
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          textAlign: "center",
          color: "white",
        }}
      >
        {props.questionIndex + 1 <= props.questionTotal - 1 && (
          <h1 onClick={handleResults}>
            QUESTION {props.questionIndex + 1} / {props.questionTotal - 1}
          </h1>
        )}
        <br />
        <h1>{props.question}</h1>
        <br />
        <center>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100px",
            }}
          >
            {renderState === 0 &&
              participantsSplits.map((split: string[], index: number) => {
                return (
                  <div key={index.toString()}>
                    {split.map((p, ii) => {
                      const points = (props.pointTable[p] || 0) + bonusPoints;
                      return (
                        <div
                          onClick={() => handleUserPress(p)}
                          key={p}
                          style={{
                            width: "260px",
                            height: "90px",
                            backgroundColor: points >= 0 ? "grey" : "darkred",
                            margin: "10px",
                          }}
                        >
                          <p
                            style={{
                              wordBreak: "break-all",
                              width: "260px",
                              fontWeight: "bolder",
                              fontSize: "24px",
                            }}
                          >
                            {index * 4 + ii + 1}. {p}
                          </p>
                          <p>Punkty: {points}</p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            {renderState === 1 &&
              props.answers.map((p) => {
                return (
                  <div
                    onClick={() => handleAnswerCliffHanger(p)}
                    key={p}
                    style={{
                      width: "260px",
                      height: "260px",
                      backgroundColor: isCliffhanger
                        ? selectedAnswer === p
                          ? "orange"
                          : "grey"
                        : selectedAnswer === p && !isSelectedAnswerCorrect
                        ? "darkred"
                        : props.correctAnswer === p
                        ? "green"
                        : "grey",

                      margin: "10px",
                    }}
                  >
                    <p
                      style={{
                        wordBreak: "break-word",
                        width: "260px",
                        fontWeight: "bolder",
                        fontSize: "24px",
                      }}
                    >
                      {p}
                    </p>
                  </div>
                );
              })}
          </div>
        </center>
      </div>
    </>
  );
}
