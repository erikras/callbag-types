// @flow
import type {
  START,
  DATA,
  END,
  SourceInitiator,
  SourceTalkback
} from './README'

// All of the code in this file should pass flow testing

const source: SourceInitiator<number> = (type: START, payload) => {
  if (
    type === 0 &&
    payload &&
    payload
    // typeof payload === 'function' &&
    // payload.length === 2
  ) {
    // start
    const sink = payload
    // handshake
    sink(0, source)
    // send first value
    sink(1, 42)
  }
}

source(0, (type, payload) => {
  if (type === 0) {
    const talkback: SourceTalkback<number> = payload
  }
})
