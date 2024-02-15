import { ChangeEvent } from "react";

type ConfigKeyProps = {
  k: string;
  v: unknown;
  onConfigChange: (key: string, change: unknown) => void;
};
export const ConfigKey = ({ k, v, onConfigChange }: ConfigKeyProps) => {
  if (typeof v === "object" && v !== null) {
    return (
      <div>
        <h2>{k}</h2> <span>ⓘ</span>
        <>
          {Object.keys(v).map((ck) => {
            return (
              <ConfigKey
                onConfigChange={onConfigChange}
                key={`${k}.${ck}`}
                k={`${k}.${ck}`}
                v={(v as Record<string, unknown>)[ck]}
              />
            );
          })}
        </>
      </div>
    );
  }
  if (typeof v === "boolean") {
    const handleBooleanChange = (e: ChangeEvent<HTMLInputElement>) => {
      onConfigChange(k, e.target.checked);
    };
    return (
      <div>
        <span>
          {k} ==={" "}
          <input onChange={handleBooleanChange} type={"checkbox"} checked={v} />{" "}
          <span>ⓘ</span>
        </span>
      </div>
    );
  } else if (typeof v === "string") {
    const handleStringChange = (e: ChangeEvent<HTMLInputElement>) => {
      onConfigChange(k, e.target.value);
    };
    return (
      <div>
        <span>
          {k} === <input onChange={handleStringChange} value={v} />{" "}
          <span>ⓘ</span>
        </span>
      </div>
    );
  } else if (typeof v === "number") {
    const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
      onConfigChange(k, parseFloat(e.target.value));
    };
    return (
      <div>
        <span>
          {k} ==={" "}
          <input type={"number"} value={v} onChange={handleNumberChange} />{" "}
          <span>ⓘ</span>
        </span>
      </div>
    );
  }

  return (
    <div>
      UNSUPPORTED TYPE {k} === {JSON.stringify(v)}
    </div>
  );
};
