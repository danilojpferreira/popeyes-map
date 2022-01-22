/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-syntax */

import { Slider } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import React, { memo, useCallback, useEffect, useState } from 'react'
import ReactMapGL, { Source, Layer } from 'react-map-gl'
import useWebSocket from 'react-use-websocket'
import { Card } from '../../components'
import { setLoading } from '../../store/actions/configurationsActions'
import Select from '../../components/Select'
import './styles.scss'
import 'mapbox-gl/dist/mapbox-gl.css'
import { formatMinutes } from '../../utils/utils'
import useWindowDimensions from '../../utils/useWindowDimensions'
import { Pause, Play, Loop, ArrowLeft } from '../../../assets/icons'
import { WS_SERVER } from '../../utils/config'

interface JSONProtocol {
  id: number
  map: string
  speed: number
  coordinate: number[]
  size: number
  step: number
}

type Coodinates = Array<Array<number>>

const Maps = (): JSX.Element => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { height, width } = useWindowDimensions()
  const { map, reverse, vehicle } = useParams()

  // connect with server
  const { lastJsonMessage, sendMessage } = useWebSocket(`ws://${WS_SERVER}`, {
    onError: console.error,
    shouldReconnect: () => true,
    reconnectInterval: 3000,
  })

  // start loading component, until load map coordinates
  useEffect(() => {
    dispatch(setLoading(true))
  }, [dispatch])

  const [id, setId] = useState<number>()
  const [steps, setSteps] = useState(0)
  const [maxSteps, setMaxSteps] = useState(0)
  const [play, setPlay] = useState(false)
  const [coordinates, setCoordinates] = useState<Coodinates>([])
  const [speed, setSpeed] = useState(1000)
  const [timer, setTimer] = useState(0)
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  })

  const handlePlay = useCallback(() => setPlay(prev => !prev), [])
  const handleSetStep = useCallback(step => {
    setSteps(step)
    setCoordinates(prev => prev.filter((_i, index) => index <= step))
    setPlay(false)
  }, [])

  // send message when play, speed or map change
  useEffect(() => {
    const id = Math.random() * 100000
    setId(id)
    sendMessage(
      JSON.stringify({
        id,
        map,
        speed,
        play,
        steps,
        reverse: !!reverse,
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play, sendMessage, speed, map, reverse])

  // stream data to coordinates
  useEffect(() => {
    if (!lastJsonMessage) return
    if (lastJsonMessage.code === 404) {
      // eslint-disable-next-line no-alert
      navigate('/404')
      return
    }
    setTimeout(() => dispatch(setLoading(false)), 2000)
    const message: JSONProtocol = lastJsonMessage
    const {
      size,
      coordinate,
      map: receiveMap,
      id: requestId,
      step: stp,
    } = message
    if (requestId === id) {
      setMaxSteps(size - 1)
      setCoordinates(prev => {
        if (map === receiveMap) {
          return [...prev, coordinate]
        }
        return [coordinate]
      })
      setViewport(prev => ({
        ...prev,
        latitude: coordinate[1],
        longitude: coordinate[0],
      }))
      setSteps(stp)
    }
  }, [lastJsonMessage, id, dispatch, map, navigate])

  useEffect(() => {
    setTimer((maxSteps - steps) * (speed / 1000))
  }, [maxSteps, speed, steps])

  useEffect(() => {
    const interval = setInterval(
      () =>
        setTimer(prev => {
          if (play) {
            return prev - 1
          }
          return prev
        }),
      1000
    )
    return () => clearInterval(interval)
  }, [play])

  useEffect(() => {
    if (steps === maxSteps && play) {
      setPlay(false)
    }
  }, [maxSteps, play, steps])

  return (
    <Card className="maps_card">
      <div className="maps_card_header">
        <div
          className="maps_card_header_back"
          role="button"
          tabIndex={0}
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
          <p>BACK</p>
        </div>
        <Select
          className="maps_card_header_picker"
          id="speed"
          label="Speed"
          selected={speed}
          // @ts-ignore
          onSelect={setSpeed}
          options={[
            {
              value: 1000,
              label: 'fast',
            },
            {
              value: 5000,
              label: 'medium',
            },
            {
              value: 10000,
              label: 'slow',
            },
          ]}
        />
      </div>
      <ReactMapGL
        {...viewport}
        width={width > 1000 ? 800 : width - 80}
        height={height - 220}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(
          nextViewport: React.SetStateAction<{
            latitude: number
            longitude: number
            zoom: number
            bearing: number
            pitch: number
          }>
        ) => {
          setViewport(nextViewport)
        }}
        mapboxApiAccessToken="pk.eyJ1IjoiZGFuaWxvLXBlcmVpcmEiLCJhIjoiY2t5bDNwdjA5MmpudTMxcXBrZ2ZhZXV6MSJ9.wHp51vWV-SqOHrPP5REwZQ"
      >
        <Source
          id="polylineLayer"
          type="geojson"
          data={{
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates,
                },
              },
            ],
          }}
        >
          <Layer
            id="lineLayer"
            type="line"
            layout={{
              'line-join': 'round',
              'line-cap': 'round',
            }}
            paint={{
              'line-color': 'rgba(3, 170, 238, 0.5)',
              'line-width': 5,
            }}
          />
        </Source>
        <Source
          id="last"
          type="geojson"
          data={{
            type: 'FeatureCollection',
            features: [
              // @ts-ignore
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [
                    coordinates?.length
                      ? coordinates[coordinates.length - 1][0]
                      : 0,
                    coordinates?.length
                      ? coordinates[coordinates.length - 1][1]
                      : 0,
                  ],
                },
              },
            ],
          }}
        >
          <Layer
            id="point"
            type="symbol"
            source="last"
            layout={{
              'icon-image': `${vehicle ?? 'bicicle-share'}-15`,
              'icon-size': 1.5,
            }}
          />
        </Source>
      </ReactMapGL>

      <div className="maps_footer">
        <div
          className={`maps_footer_button ${!play ? 'blob' : ''}`}
          role="button"
          tabIndex={0}
          onClick={handlePlay}
        >
          {play ? <Pause /> : <Play />}
        </div>
        <div
          className="maps_footer_button"
          role="button"
          tabIndex={0}
          onClick={() => {
            setPlay(false)
            setCoordinates([])
            setSteps(0)
            setTimer(maxSteps * (speed / 1000))
          }}
        >
          <Loop />
        </div>
        <Slider
          value={steps}
          onChange={(_e, value) => {
            handleSetStep(value)
          }}
          step={1}
          min={0}
          max={maxSteps}
        />
        <p className="maps_footer_travel-time">{formatMinutes(timer)}</p>
      </div>
    </Card>
  )
}

export default memo(Maps)
