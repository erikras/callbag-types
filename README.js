/**
 * *****************************************************************
 * *****************************************************************
 *                       ⚠️  DO NOT USE! ⚠️
 * From what I can tell, Flow does not allow enough fine control
 * over polymorphism to realistically tame the possible typings
 * of callbags. If someone can figure it out, PRs very, very welcome.
 * *****************************************************************
 * *****************************************************************
 *
 * This library provides types for 👜 Callbags according to the spec.
 *
 * Spec: https://github.com/callbag/callbag
 * Original Typing work: http://blog.krawaller.se/posts/explaining-callbags-via-typescript-definitions/
 *
 * Installation
 *
 * npm install --save-dev callbag-types
 *
 * Usage
 *
 * import type { START, SourceInitiator } from 'callbag-types'
 *
 * @flow
 */

export type START = 0
export type DATA = 1
export type END = 2

/**
 * Quoth the spec:
 *
 * "A callbag is terminated when the first argument is 2 and the second
 * argument is either undefined (signalling termination due to success)
 * or any truthy value (signalling termination due to failure)."
 */
export type SourceTalkback<T> = ((DATA, T) => void) &
  ((END, error?: any) => void)

export type SinkTalkback<T> = ((
  START,
  SourceTalkback<T> | SourceInitiator<T>
) => void) &
  SourceTalkback<T>

/**
 * Quoth the spec:
 *
 * "When a source is greeted and given a sink as payload, the sink MUST
 * be greeted back with a callbag payload that is either the source
 * itself or another callbag (known as the 'talkback'). In other
 * words, greets are mutual. Reciprocal greeting is called a handshake."
 */
export type SourceInitiator<T> = (START, SinkTalkback<T>) => void

export type SinkConnector<T> = (
  source: SourceInitiator<T>
) => ?SourceInitiator<T>

export type SourceFactory<T> = (...args: any[]) => SourceInitiator<T>

export type Operator<T> = (...args: any[]) => SinkConnector<T>

export type Callbag =
  | SourceTalkback<*>
  | SinkTalkback<*>
  | SourceFactory<*>
  | SourceInitiator<*>
  | SinkConnector<*>
