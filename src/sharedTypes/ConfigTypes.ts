type TieredLimit = { all: number; follower: number; paid: number };

export type SongRequestV1Config = {
  vipSkipLimits: boolean;
  modSkipLimits: boolean;

  allowNonFollowers: boolean;

  queueMax: number;

  allowModsControlVolume: boolean;

  viewLimit: TieredLimit;
  lengthLimit: TieredLimit;
  queueLimit: TieredLimit;

  allowSkipVote: boolean;
  requiredVotesToSkip: number;

  badVoteLimit: number;
  badVoteDecay: number;
};

export type ConfigV1 = {
  songRequest: SongRequestV1Config;
  translations: Record<string, string>;
};

export type ConfigContainer = {
  version: number;
  updatedAt: number;
  data: ConfigV1;
};
