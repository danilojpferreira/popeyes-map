/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Card, Select, Typing } from '../../components'
import { ArrowRight } from '../../../assets/icons'
import './styles.scss'

const Main = (): JSX.Element => {
  const navigate = useNavigate()
  const [showList, setShowList] = useState(false)
  const [map, setMap] = useState()

  return (
    <Card className="main_card">
      <Typing
        sentences={['Hello Popeye,', 'where to go now?']}
        onFinish={() => setShowList(true)}
      />
      {showList && (
        <Select
          id="destiny"
          label="Pick your destiny"
          selected={map}
          // @ts-ignore
          onSelect={setMap}
          options={[
            {
              value: 'to_work/car',
              label: 'To Work',
            },
            {
              value: 'to_work/car/reverse',
              label: 'To Home',
            },
            {
              value: 'to_lunch/pitch',
              label: 'To Lunch',
            },
          ]}
        />
      )}

      {map ? (
        <Button
          text="GO"
          rightIcon={<ArrowRight />}
          onClick={() => navigate(`/maps/${map}`)}
        />
      ) : (
        <div />
      )}
    </Card>
  )
}

export default memo(Main)
