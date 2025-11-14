import { Bumble } from '@/types'
import {
  BLACK,
  WHITE,
  BUMBLE,
  ERROR,
  FONT
} from '@/data/consts'
import {
  colorFromSector,
  colorToButton
} from '../helpers'

export const SendEntity = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  bumble: Bumble
) => {
  const radius = width < height * 0.67 ? width * 0.48 : height * 0.325

  context.strokeStyle = colorToButton(WHITE, BUMBLE)

  if (bumble === 'send') {
    context.font = `bold ${radius * 0.335}px ${FONT}`
  } else if (bumble === 'error') {
    context.font = `bold ${radius * 0.310}px ${FONT}`
    context.strokeStyle = colorFromSector(ERROR)
  } else if (bumble === 'default') {
    context.font = `bold ${radius * 0.285}px ${FONT}`
  }

  context.textAlign = 'center'
  context.lineWidth = radius * 0.035
  context.strokeText('Wordlynx', width * 0.5, height * 0.875)
  context.fillStyle = colorToButton(BLACK, BUMBLE)
  context.fillText('Wordlynx', width * 0.5, height * 0.875)
}
