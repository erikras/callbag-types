// @flow

// Plagiarized from http://blog.krawaller.se/posts/explaining-callbags-via-typescript-definitions/
// and added generics.

export type START = 0
export type DATA = 1
export type END = 2

export type SourceTalkback = ((request: DATA) => void) &
  ((terminate: END) => void)

export type SinkTalkback<T> = ((
  start: START,
  sourceTalkback: SourceTalkback
) => void) &
  ((deliver: DATA, data: T) => void) &
  ((terminate: END, error?: any) => void)

export type SourceInitiator<T> = (type: START, payload: SinkTalkback<T>) => void

export type SinkConnector<T> = (
  source: SourceInitiator<T>
) => SourceInitiator<T> | void

export type SourceFactory<T> = (...args: any[]) => SourceInitiator<T>

export type Operator<T> = (...args: any[]) => SinkConnector<T>

export type Callbag =
  | SourceTalkback
  | SinkTalkback<*>
  | SourceFactory<*>
  | SourceInitiator<*>
  | SinkConnector<*>
