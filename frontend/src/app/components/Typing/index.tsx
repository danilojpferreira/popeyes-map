/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import React, { memo, useEffect, useState } from 'react'
import { sleep } from '../../utils/utils'
import './styles.scss'

interface Props {
  sentences: string[]
  onFinish: () => void
}

const Typing = ({ sentences = [], onFinish }: Props): JSX.Element => {
  const [text, setText] = useState('')

  useEffect(() => {
    const run = async () => {
      for (const sentence of sentences) {
        for (const i of sentence.split('')) {
          // eslint-disable-next-line no-loop-func
          setText(prev =>
            prev.length === sentences.join().length + (sentences.length - 1)
              ? prev
              : `${prev}${i}`
          )
          await sleep(50)
        }
        setText(prev =>
          prev.length === sentences.join().length + (sentences.length - 1)
            ? prev
            : `${prev} `
        )
        await sleep(700)
      }
    }
    run()
  }, [sentences])

  useEffect(() => {
    if (text.length === sentences.join().length + sentences.length - 1)
      onFinish()
  }, [onFinish, sentences, text.length])

  return <p className="typing">{text}</p>
}

export default memo(Typing)
