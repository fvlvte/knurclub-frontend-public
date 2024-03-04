enum WSMessages {
  WS_EVENT_SUBSCRIBE = 'event.subscribe',
  WS_EVENT_UNSUBSCRIBE = 'event.unsubscribe',

  WS_SR_QUEUE_POLL = 'songrequest.queue.poll',
  WS_SR_SYNC = 'songrequest.sync',
}

export enum WSEvents {
  EVENT_SR_PLAYBACK = 'songrequest.playback', // skip/volume/player control/etc events
}

export type WSEventSubscribe = {
  name: string
  condition: string
}

export type WSEventSubscribe_Response = {
  error?: string
  id?: string
}

export type WSEventUnsubscribe = {
  name?: string
  id?: string
}

export type WSEVentUnsubscribe_Response = {
  error?: string
}

export type MessageFrame_Input = {
  id: string
  type: keyof WSMessages
  params: string[]
}

export type MessageFrame_Output = {
  id: string
  type: keyof WSMessages
  params: string[]
}
