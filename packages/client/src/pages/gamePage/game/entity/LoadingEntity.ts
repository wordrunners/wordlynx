import {
  BLACK,
  WHITE,
  FONT
} from '@/data/consts'
import {
  colorFromSector,
} from '../helpers'

export const BackgroundEntity = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) => {
  const radius = width < height * 0.67 ? width * 0.48 : height * 0.325

  context.font = `bold ${radius * 0.485}px ${FONT}`
  context.textAlign = 'center'

  context.lineWidth = radius * 0.035
  context.strokeStyle = colorFromSector(WHITE)
  context.strokeText('Wordlynx', width * 0.5, height * 0.375)
  context.fillStyle = colorFromSector(BLACK)
  context.fillText('Wordlynx', width * 0.5, height * 0.375)

  context.font = `bold ${radius * 0.185}px ${FONT}`
  context.textAlign = 'center'
  context.fillStyle = colorFromSector(BLACK)
  context.fillText('loading...', width * 0.5, height * 0.575)
}
