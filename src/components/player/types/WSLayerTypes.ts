enum WSMessages
{
    WS_EVENT_SUBSCRIBE = "event.subscribe",
    WS_EVENT_UNSUBSCRIBE = "event.unsubscribe",

    WS_SR_QUEUE_POLL = "songrequest.queue.poll",
    WS_SR_SYNC = "songrequest.sync"
}

enum WSEvents {
    EVENT_SR_PLAYBACK = "songrequest.playback" // skip/volume/player control/etc events
}

type WSEventSubscribe = {
    name: string;
    condition: string;
};

type WSEventSubscribe_Response = {
  error?: string;
  id?: string;
};

type WSEventUnsubscribe = {
    name?: string;
    id?: string;
}

type WSEVentUnsubscribe_Response = {
    error?: string;
}

type MessageFrame_Input = {
    id: string;
    type: keyof WSMessages;
    params: string[];
};


type MessageFrame_Output = {
    id: string;
    type: keyof WSMessages;
    params: string[];
};
