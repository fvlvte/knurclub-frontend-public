export type DiscordConnectedAccount = {
  platform: string
  id: string
}

export type DiscordMember = {
  id: string
  username: string
  tag: string
  avatar: string
  connectedAccounts: DiscordConnectedAccount[]
}
