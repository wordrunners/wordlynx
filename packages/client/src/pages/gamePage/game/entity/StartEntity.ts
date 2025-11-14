import { Settings } from '@/types'
import {
  BLACK,
  BLUE_MEDIUM,
  WHITE,
  BLUE_BLACK,
  FONT
} from '@/data/consts'
import {
  colorFromSector,
} from '../helpers'

export const StartEntity = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  totalPlayers: number,
  settings: Settings,
  activeSettings: Settings,
  authorized: boolean
) => {
  const radius = width < height * 0.67 ? width * 0.48 : height * 0.325

  context.font = `bold ${radius * 0.485}px ${FONT}`
  context.textAlign = 'center'

  context.lineWidth = radius * 0.035
  context.strokeStyle = colorFromSector(WHITE)
  context.strokeText('Wordlynx', width * 0.5, height * 0.375)
  context.fillStyle = colorFromSector(BLACK)
  context.fillText('Wordlynx', width * 0.5, height * 0.375)

  context.font = `bold ${radius * 0.055}px ${FONT}`
  context.fillText('Select mode: ↓ ↑ →, Press SPACE to start', width * 0.5, height * 0.900)

  if (settings === 'default') {
    context.font = `bold ${radius * 0.185}px ${FONT}`
    context.textAlign = 'center'

    const checkSettings = (colorOne: string, colorTwo: string) => {
      context.fillStyle = colorFromSector(colorOne)
      context.fillText('Local', width * 0.5, height * 0.575)
      if (authorized) {
        context.fillStyle = colorFromSector(colorTwo)
        context.fillText('Rating', width * 0.5, height * 0.675)
      }

      if (!authorized) {
        context.fillStyle = colorFromSector(BLUE_MEDIUM)
        context.fillText('Rating', width * 0.5, height * 0.675)
        context.font = `bold ${radius * 0.055}px ${FONT}`
        context.fillText('Authorization required', width * 0.5, height * 0.700)
      }
    }

    if (activeSettings === 'online') {
      checkSettings(BLACK, WHITE)
    } else if (activeSettings === 'local') {
      checkSettings(WHITE, BLACK)
    } else {
      checkSettings(BLACK, BLACK)
    }
  }
  if (settings === 'local') {
    context.font = `bold ${radius * 0.185}px ${FONT}`
    context.textAlign = 'center'
    context.fillStyle = colorFromSector(BLACK)
    context.fillText('Players:', width * 0.5, height * 0.575)

    for (let i = 0; i <= totalPlayers; i++) {
      const color = (totalPlayers === i) ? colorFromSector(WHITE) : colorFromSector(BLUE_BLACK)
      context.font = `bold ${radius * 0.135}px ${FONT}`
      context.textAlign = 'center'
      context.fillStyle = color
      context.fillText(`${i + 1}`, width * 0.5 + (i - 1.5) * radius * 0.135, height * 0.675)
    }
  } else if (settings === 'online') {
    context.font = `bold ${radius * 0.185}px ${FONT}`
    context.textAlign = 'center'
    context.fillStyle = colorFromSector(BLACK)
    context.fillText('Online:', width * 0.5, height * 0.575)
  }
}
