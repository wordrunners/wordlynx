import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CanvasContext,
  useAppSelector,
  useAppDispatch
} from '@/hooks'
import {
  deleteLetter,
  addLetter,
  selectWord,
  selectHeight,
  selectWidth,
  setTimer,
  decrementIfTime,
  selectPlayers,
  addPlayer,
  deletePlayers,
  addWord,
  selectCard,
  deleteWord,
  clearPoints,
  setActivePlayer,
  selectTotalPlayers,
  selectActivePlayer,
  setStatus,
  selectCards,
  setCards,
  setActiveCard,
  nextActiveCard,
  selectActiveCard,
  countPoints,
  setSelectedSector,
  deleteSelectedSectors,
  setEnabledSectors,
  selectSettings,
  setBumble
} from '../core/gameSlice'

import { Game } from '../core/game'
import {
  correctPixels,
} from '../helpers'
import {
  ROUNDS,
  BUMBLE,
} from '@/data/consts'

import cardsData from '@/data/cards.json'
import playersData from '@/data/players.json'
import { dictionary } from '@/data/google-10000-english'
import { fetchLeaderboard } from '@/store/leaderBoardSlice'
import { selectUser } from '@/store/authSlice'

export const GamePlay = () => {
  const navigate = useNavigate()
  const totalPlayers = useAppSelector(selectTotalPlayers)
  if (totalPlayers === -1) {
    navigate(`/game`)
  }

  const dispatch = useAppDispatch()

  const width = useAppSelector(selectWidth)
  const height = useAppSelector(selectHeight)
  const players = useAppSelector(selectPlayers)
  const word = useAppSelector(selectWord)
  const card = useAppSelector(selectCard)
  const cards = useAppSelector(selectCards)
  const activeCard = useAppSelector(selectActiveCard)

  const activePlayer = useAppSelector(selectActivePlayer)
  const settings = useAppSelector(selectSettings)
  const userState = useAppSelector(selectUser)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | undefined>()

  useEffect(() => {
    if (totalPlayers === -1) {
      navigate(`/game`)
    }
    const context = canvasRef.current?.getContext('2d', { willReadFrequently: true })
    if (context) {
      setContext(context)

      dispatch(setStatus('game'))
      dispatch(setActivePlayer(0))
      dispatch(setTimer(60))
      dispatch(decrementIfTime())
      dispatch(deletePlayers())

      const newCards = []

      if (settings === 'local') {
        for (let i = 0; i <= totalPlayers; i++) {
          dispatch(addPlayer(playersData[i]))
        }
      } else if (settings === 'online') {
        dispatch(fetchLeaderboard());
        userState.login && dispatch(addPlayer({
          'login': userState.login,
          'words': [],
          'score': 0,
          'enabled': true
        }))
      }
      for (let i = 0; i <= ((totalPlayers + 1) * ROUNDS - 1); i++) {
        newCards.push(cardsData[Math.floor(Math.random() * cardsData.length)])
      }
      console.log(newCards);
      dispatch(setCards(newCards))
      dispatch(setActiveCard(0))
      dispatch(setEnabledSectors())
    }
  }, [])

  const handleCanvasMove = (event: React.MouseEvent<HTMLElement>) => {
    if ((context) && (card) && (cards)) {
      const mousePos = { x: event.clientX, y: event.clientY }
      const pixels = context.getImageData(mousePos.x, mousePos.y, 12, 12).data

      if (pixels) {
        const { sector, button } = correctPixels(pixels)
        if (button === BUMBLE) {
          dispatch(setBumble('send'))
        } else if (sector < 9) {
          dispatch(setBumble('default'))
          dispatch(setSelectedSector(`${sector}`))
        } else if (sector === 9) {
          dispatch(setBumble('default'))
          dispatch(deleteSelectedSectors())
        }
      }
    }
  }

  const handleCanvasClick = (event: React.MouseEvent<HTMLElement>) => {
    if ((context) && (card) && (cards)) {
      const card = cards[activeCard]
      const mousePos = { x: event.clientX, y: event.clientY }
      const pixels = context.getImageData(mousePos.x, mousePos.y, 12, 12).data

      if (pixels) {
        const { sector, button } = correctPixels(pixels)
        if (button === BUMBLE) {
          players.map((player, i) => {
            if (i === activePlayer) {
              let data = ''
              for (let i = 0; i < word.length; i++) {
                data += card[+word[i]].letter
              }

              if (dictionary.includes(data.toLowerCase())) {
                dispatch(addWord(i, data))
                dispatch(deleteWord())
                dispatch(clearPoints())
                dispatch(nextActiveCard())
                dispatch(setEnabledSectors())

                if (activeCard === ((totalPlayers + 1) * ROUNDS - 1)) {
                  navigate('/game-over')
                }
              } else {
                dispatch(setBumble('error'))
                setTimeout(() => {
                  dispatch(setBumble('default'))
                }, 200)
              }
            }
          })
        } else if (sector < 9) {
          dispatch(addLetter(`${sector}`))
          dispatch(countPoints())
        } else if ((sector === 9) && (word)) {
          dispatch(deleteLetter())
          dispatch(countPoints())
        }
      }
    }
  }

  if (totalPlayers !== -1) {
    return (
      <CanvasContext.Provider value={{ context: context }}>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasMove}
        ></canvas>
        <Game />
      </CanvasContext.Provider>
    )
  } else {
    return (
      null
    )
  }
}
