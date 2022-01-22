/* eslint-disable no-return-assign */
/* eslint-disable no-promise-executor-return */
export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const formatMinutes = (s: number) =>
  // eslint-disable-next-line no-param-reassign
  (s - (s %= 60)) / 60 + (s > 9 ? ':' : ':0') + s
