import { useState } from 'react'

export type BackendSong = {
  title: string
  subtitle: string

  audioSourceURL?: string
  iconSource?: string
  startFrom?: number

  user: {
    id: string
    name: string
    reputation: number
  }

  duration: number
  playing: boolean
}

export function useBackendSong() {
  const [song] = useState<BackendSong | null>({
    title: 'Barka',
    subtitle: 'Juan Pablo Segundo',

    iconSource:
      'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQOqcFwpjoI92BA4NCoeUtTPWeeYLjra9Slj2p2okfaDpHLXpNp',
    audioSourceURL: 'https://www.youtube.com/watch?v=HrejDpSuGGY',
    startFrom: 0,

    user: {
      id: '2137test',
      name: 'watykańczyk2137',
      reputation: 2137,
    },
    duration: 2137,
    playing: false,
  })

  return song
}
