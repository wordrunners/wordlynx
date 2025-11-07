import { useRef, useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CanvasContext,
  useAppSelector,
  useAppDispatch
} from '@/hooks'
import {
  selectHeight,
  selectWidth,
  setWidth,
  setHeight,
  setTotalPlayers,
  setStatus,
  nextTotalPlayers,
  setSettings,
  setActiveSettings,
} from '../core/gameSlice'
import {
  setActiveLeader
} from '@/store/leaderBoardSlice'
import { Game } from '../core/game'
import { Settings } from '@/types'

export const GameStart = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const width = useAppSelector(selectWidth)
  const height = useAppSelector(selectHeight)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | undefined>()

  let settingsLines: Settings = 'default'

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d', { willReadFrequently: true })
    if (context) {
      setContext(context)
      dispatch(setStatus('start'))
      window.addEventListener('keydown', setPlayers)
      dispatch(setTotalPlayers(0))
      dispatch(setActiveLeader(-1))
      setSizes()
      window.addEventListener('resize', setSizes)
    }
  }, [])

  const setPlayers = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        dispatch(setSettings('default'))
        settingsLines = 'default'
        break
      case 'ArrowDown':
        settingsLines = 'online'
        dispatch(setActiveSettings('online'))
        break
      case 'ArrowUp':
        settingsLines = 'local'
        dispatch(setActiveSettings('local'))
        break
      case 'ArrowRight':
        if ((settingsLines === 'players') || (settingsLines === 'ready')) {
          settingsLines = 'ready'
          dispatch(nextTotalPlayers())
        }
        break
      case 'Enter':
      case ' ':
        if ((settingsLines === 'players') || (settingsLines === 'ready')) {
          window.removeEventListener('keydown', setPlayers)
          navigate('/game-play')
          dispatch(setStatus('loading'))
          dispatch(setSettings('local'))
          settingsLines = 'default'
          dispatch(setActiveSettings('default'))
        } else if ((settingsLines === 'local')) {
          dispatch(setSettings(settingsLines))
          settingsLines = 'players'
        } else if ((settingsLines === 'online')) {
          window.removeEventListener('keydown', setPlayers)
          navigate('/game-play')
          dispatch(setStatus('loading'))
          dispatch(setSettings(settingsLines))
          settingsLines = 'default'
          dispatch(setActiveSettings('default'))
        }
        break
      default:
        console.log(`The ${event.key} button does not launch the game.`)
    }
  }

  const setSizes = useCallback(() => {
    dispatch(setWidth(window.innerWidth))
    dispatch(setHeight(window.innerHeight))
  }, [dispatch(setWidth), dispatch(setHeight)])

  return (
    <CanvasContext.Provider value={{ context: context }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
      ></canvas>
      <Game />
    </CanvasContext.Provider>
  )
}
