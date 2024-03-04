export enum TwitchHelixScopes {
  AnalyticsReadExtensions = 'analytics:read:extensions',
  AnalyticsReadGames = 'analytics:read:games',
  BitsRead = 'bits:read',
  ChannelManageAds = 'channel:manage:ads',
  ChannelReadAds = 'channel:read:ads',
  ChannelManageBroadcast = 'channel:manage:broadcast',
  ChannelReadCharity = 'channel:read:charity',
  ChannelEditCommercial = 'channel:edit:commercial',
  ChannelReadEditors = 'channel:read:editors',
  ChannelManageExtensions = 'channel:manage:extensions',
  ChannelReadGoals = 'channel:read:goals',
  ChannelReadGuestStar = 'channel:read:guest_star',
  ChannelManageGuestStar = 'channel:manage:guest_star',
  ChannelReadHypeTrain = 'channel:read:hype_train',
  ChannelManageModerators = 'channel:manage:moderators',
  ChannelReadPolls = 'channel:read:polls',
  ChannelManagePolls = 'channel:manage:polls',
  ChannelReadPredictions = 'channel:read:predictions',
  ChannelManagePredictions = 'channel:manage:predictions',
  ChannelManageRaids = 'channel:manage:raids',
  ChannelReadRedemptions = 'channel:read:redemptions',
  ChannelManageRedemptions = 'channel:manage:redemptions',
  ChannelManageSchedule = 'channel:manage:schedule',
  ChannelReadStreamKey = 'channel:read:stream_key',
  ChannelReadSubscriptions = 'channel:read:subscriptions',
  ChannelManageVideos = 'channel:manage:videos',
  ChannelReadVips = 'channel:read:vips',
  ChannelManageVips = 'channel:manage:vips',
  ClipsEdit = 'clips:edit',
  ModerationRead = 'moderation:read',
  ModeratorManageAnnouncements = 'moderator:manage:announcements',
  ModeratorManageAutomod = 'moderator:manage:automod',
  ModeratorReadAutomodSettings = 'moderator:read:automod_settings',
  ModeratorManageAutomodSettings = 'moderator:manage:automod_settings',
  ModeratorManageBannedUsers = 'moderator:manage:banned_users',
  ModeratorReadBlockedTerms = 'moderator:read:blocked_terms',
  ModeratorManageBlockedTerms = 'moderator:manage:blocked_terms',
  ModeratorManageChatMessages = 'moderator:manage:chat_messages',
  ModeratorReadChatSettings = 'moderator:read:chat_settings',
  ModeratorManageChatSettings = 'moderator:manage:chat_settings',
  ModeratorReadChatters = 'moderator:read:chatters',
  ModeratorReadFollowers = 'moderator:read:followers',
  ModeratorReadGuestStar = 'moderator:read:guest_star',
  ModeratorManageGuestStar = 'moderator:manage:guest_star',
  ModeratorReadShieldMode = 'moderator:read:shield_mode',
  ModeratorManageShieldMode = 'moderator:manage:shield_mode',
  ModeratorReadShoutouts = 'moderator:read:shoutouts',
  ModeratorManageShoutouts = 'moderator:manage:shoutouts',
  UserEdit = 'user:edit',
  UserEditFollows = 'user:edit:follows',
  UserReadBlockedUsers = 'user:read:blocked_users',
  UserManageBlockedUsers = 'user:manage:blocked_users',
  UserReadBroadcast = 'user:read:broadcast',
  UserManageChatColor = 'user:manage:chat_color',
  UserReadEmail = 'user:read:email',
  UserReadFollows = 'user:read:follows',
  UserReadModeratedChannels = 'user:read:moderated_channels',
  UserReadSubscriptions = 'user:read:subscriptions',
  UserManageWhispers = 'user:manage:whispers',
  ChannelBot = 'channel:bot',
  ChannelModerate = 'channel:moderate',
  ChatEdit = 'chat:edit',
  ChatRead = 'chat:read',
  UserBot = 'user:bot',
  UserReadChat = 'user:read:chat',
  WhispersRead = 'whispers:read',
  WhispersEdit = 'whispers:edit',
}

export enum Features {
  ALL = 'all',
  SONG_REQUEST = 'sr',
  SOUND_ALERTS = 'alerts',
  EVENT_ALERTS = 'events',
}

const FeatureMatrix: Record<Features, TwitchHelixScopes[]> = {
  [Features.ALL]: Object.values(TwitchHelixScopes),
  [Features.SONG_REQUEST]: [
    TwitchHelixScopes.UserReadSubscriptions,
    TwitchHelixScopes.ChannelReadSubscriptions,
    TwitchHelixScopes.ChannelReadGoals,
    TwitchHelixScopes.ChannelReadHypeTrain,
    TwitchHelixScopes.ModeratorReadFollowers,
    TwitchHelixScopes.BitsRead,
  ],
  [Features.SOUND_ALERTS]: [
    TwitchHelixScopes.UserReadSubscriptions,
    TwitchHelixScopes.ChannelReadRedemptions,
    TwitchHelixScopes.ChannelManageRedemptions,
    TwitchHelixScopes.ChannelReadSubscriptions,
    TwitchHelixScopes.ChannelReadGoals,
    TwitchHelixScopes.ChannelReadHypeTrain,
    TwitchHelixScopes.ModeratorReadFollowers,
    TwitchHelixScopes.BitsRead,
  ],
  [Features.EVENT_ALERTS]: [
    TwitchHelixScopes.UserReadSubscriptions,
    TwitchHelixScopes.BitsRead,
    TwitchHelixScopes.ChannelReadSubscriptions,
    TwitchHelixScopes.ChannelReadGoals,
    TwitchHelixScopes.ChannelReadHypeTrain,
    TwitchHelixScopes.ModeratorReadFollowers,
    TwitchHelixScopes.BitsRead,
  ],
}

export class TwitchHelixScopeHelper {
  static getHelixScopesForFeature(features: Features[]): string[] {
    const result: string[] = []

    for (const feature of features) {
      result.push(...FeatureMatrix[feature])
    }

    return Array.from(new Set(result))
  }
}
