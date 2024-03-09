const TT: Record<string, string> = {
  data: 'Ustawienia',
  'data.songRequest': 'Song Request: Generalne',
  'data.songRequest.modSkipLimits': 'Moderatorzy omijają limity',
  'data.songRequest.queueMax': 'Maksymalna liczba piosenek w kolejce',
  'data.songRequest.allowModsControlVolume':
    'Moderatorzy mogą konrolować głośność',
  'data.songRequest.viewLimit':
    'Song Request: Minimalny limit wyświetleń piosenki',
  'data.songRequest.viewLimit.all': 'Wszyscy',
  'data.songRequest.viewLimit.paid': 'Subskrybenci',
  'data.songRequest.lengthLimit': 'Song Request: Maksymalna długość piosenki',
  'data.songRequest.lengthLimit.all': 'Wszyscy',
  'data.songRequest.lengthLimit.paid': 'Subskrybenci',
  'data.songRequest.queueLimit':
    'Song Request: Limit piosenek użytkownika w kolejce',
  'data.songRequest.queueLimit.all': 'Wszyscy',
  'data.songRequest.queueLimit.paid': 'Subskrybenci',
  'data.songRequest.allowSkipVote':
    'Pozwalaj na głosowanie skipowania piosenki',
  'data.songRequest.requiredVotesToSkip':
    'Liczba głosów potrzbnych do skipnięcia piosenki',
  'data.songRequest.badVoteLimit': 'Limit negatywnej reputacji',
  'data.translations': 'Komunikaty',
  'data.translations.UNAUTHORIZED_COMMAND_CALL':
    'Wywołanie komendy bez uprawnień',
  'data.translations.SUCCESS': 'Wykonanie komendy powiodło się',
  'data.translations.UNKNOWN_ERROR ': 'Błąd: Nieznany',
  'data.translations.SR_ERROR_NO_SONG': 'Błąd: Brak piosenki w SR',
  'data.translations.SR_VOTE_BAD_SUCCESS':
    'Sukces: Oddanie złego (syfa) głosu na piosenke',
  'data.translations.SR_VOTE_GOOD_SUCCESS':
    'Sukces: Oddanie dobrego (gita) głosu na piosenke',
  'data.translations.SR_ERROR_VOTE_SELF':
    'Błąd: Oddanie głosu na swoją piosenkę',
  'data.translations.SR_ERROR_VOTE_MULTIPLE':
    'Błąd: Wielokrotne oddanie głosu na piosenke',
  'data.translations.SR_ERROR_VOTE_LIMIT': 'Błąd: Wyczerpane głosy na piosenki',
  'data.translations.SR_BANNED_USER': 'Błąd: Użytkownik zbanowany z SR',
  'data.translations.SR_BANNED_KEYWORD':
    'Błąd: Zbanowany keyword w tytule/tagach piosenki',
  'data.translations.SR_NON_ALLOWED_CATEGORY':
    'Błąd: Niedozwolona kategoria piosenki',
  'data.translations.SR_VIEW_LIMIT': 'Błąd: Za mało wyświetleń piosenki',
  'data.translations.SR_LENGTH_LIMIT': 'Błąd: Za długa piosenka',
  'data.translations.SR_NEGATIVE_REPUTATION_LIMIT':
    'Błąd: User posiada za dużo negatywnej reputacji SR',
  'data.translations.SR_ADD_OK': 'Sukces: Dodano piosenke do SR',
  'data.translations.SR_ADD_UNKNOWN_ERROR':
    'Błąd: Niedozwolona piosenka (age restricted)',
  'data.translations.SR_NOT_FOUND': 'Błąd: Nie udało się znaleźć piosenki',
  'data.translations.SR_EMPTY_QUEUE': 'Błąd: Pusta kolejka',
  'data.translations.SR_QUEUE_PRINT': 'Aktualne piosenki w kolejce',
  'data.translations.SR_ERR_NO_SONG': 'Błąd: Brak piosenki w kolejce',
  'data.translations.SR_SONG_INFO': 'Informacje o aktualnej piosence w kolejce',
  'data.translations.SR_SKIP_VOTE_IN_PROGRESS': 'Postęp skip vote',
  'data.translations.SR_SKIP_VOTE_SUCCESS': 'Sukces skip vote',
  'data.translations.SR_ADMIN_SKIP': 'Admin skip vote',
  'data.translations.SR_WRONG_SONG_NOT_FOUND': 'Brak piosenki do usunięcia',
  'data.translations.SR_WRONG_SONG_WIPED': 'Sukces: Usunięto złą piosenkę',
  'data.translations.SR_MY_SONG_INFO': 'Informacje o mojej piosence',
  'data.translations.SR_MY_SONG_NOT_FOUND':
    'Błąd: Brak własnej piosenki w kolecje',
  'data.translations.INFO_KNURCAMP': '!knurcamp',
  'data.translations.SOCIALS_DISCORD': '!dc',
  'data.translations.SOCIALS_YT': '!yt',
  'data.translations.SOCIALS_PROJECT': '!projekt',
  'data.translations.TIMER_DISCORD': 'Timer 1',
  'data.translations.TIMER_YT': 'Timer 2',
  'data.translations.SR_QUEUE_LIMIT':
    'Błąd: Osiągnięto limit piosenek w kolecje',
  'data.translations.SR_SONG_IN_QUEUE':
    'Bład: Ta piosenka znajduje się już w kolejce',
  'data.translations.SR_QUEUE_SONG_LIMIT':
    'Błąd: Osoba ma już za dużo piosenek w kolejce',
  'data.translations.SR_INVALID_VOLUME_VALUE':
    'Błąd: Nieprawidłowa wartość głośności',
  'data.translations.SR_VOLUME_SET': 'Sukces: Ustawienie głośności',
  'data.translations.SR_ADMIN_STOP': 'Sukces: Admin stop SR',
  'data.translations.SR_ADMIN_PLAY': 'Sukces: Admin start SR',
  'data.translations.CMD_CreateReward_HELP': 'Pomoc do komendy !rewardadd',
  'data.translations.CMD_ReloadLocale_HELP': 'Pomoc do komendy !lcreload',
  'data.translations.CMD_SongRequestAdd_HELP': 'Pomoc do komendy !ksr',
  'data.translations.CMD_SongRequestCurrent_HELP': 'Pomoc do komendy !song',
  'data.translations.CMD_SongRequestMySong_HELP': 'Pomoc do komendy !kms',
  'data.translations.CMD_SongRequestQueue_HELP': 'Pomoc do komendy !queue',
  'data.translations.CMD_SongRequestReputationVote_HELP':
    'Pomoc do komend !syf !git',
  'data.translations.CMD_SongRequestSkipVote_HELP': 'Pomoc do komendy !skip',
  'data.translations.CMD_SongRequestWipe_HELP': 'Pomoc do komendy !wipe',
  'data.translations.CMD_SongRequestWrongSong_HELP':
    'Pomoc do komendy !wrongsong',
}
const TooltipTT: Record<string, string> = {}

export class ConfigTranslation {
  public static translateKey(key: string): string {
    return TT[key] ? TT[key] : key
  }

  public static translateKeyTooltip(key: string): string | undefined {
    return TooltipTT[key]
  }
}
