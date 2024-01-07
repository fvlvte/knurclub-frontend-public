export const PolonczKonto: React.FC = () => {
  const KLIENT_ID = "z4ngv8hovfeaq7rstf7egijqn351wu";
  const REDIRECT_URL = "http://localhost:3000/oauth-flow";
  const szkopy = [
    "bits:read",
    "channel:manage:broadcast",
    "channel:read:charity",
    "channel:edit:commercial",
    "channel:read:editors",
    "channel:manage:extensions",
    "channel:read:goals",
    "channel:read:guest_star",
    "channel:manage:guest_star",
    "channel:read:hype_train",
    "channel:manage:moderators",
    "channel:read:polls",
    "channel:manage:polls",
    "channel:read:predictions",
    "channel:manage:predictions",
    "channel:manage:raids",
    "channel:read:redemptions",
    "channel:manage:redemptions",
    "channel:manage:schedule",
    "channel:read:stream_key",
    "channel:read:subscriptions",
    "channel:manage:videos",
    "channel:read:vips",
    "channel:manage:vips",
  ];
  const makeRedirectUrl = (clientId: string, redirectUrl: string) => {
    return `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${szkopy.join(
      "+",
    )}`;
  };
  const doTwitchAuth = () => {
    window.location.href = makeRedirectUrl(KLIENT_ID, REDIRECT_URL);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>KNUR CLUB WIDGET</h1>
      <h2>MUSISZ MIEĆ MINIMUM 213.7 FOLLOWUW ABY DZIAŁAO</h2>
      <button onClick={doTwitchAuth}>POŁONCZ KONTO TWICZ</button>
    </div>
  );
};
