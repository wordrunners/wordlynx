import {
  Leader,
  Leaders
} from '@/types'
import {
  BLUE_BLACK,
  FONT
} from '@/data/consts'
import {
  colorFromSector
} from '../helpers'

export const HighScoresEntity = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  leaders: Leaders,
  currentLeader: Leader,
) => {
  const coordinates = [
    { x: width * 0.2, y: height * 0.025 },
    { x: width * 0.35, y: height * 0.025 },
    { x: width * 0.5, y: height * 0.025 },
    { x: width * 0.65, y: height * 0.025 },
    { x: width * 0.8, y: height * 0.025 },

    { x: width * 0.2, y: height * 0.045 },
    { x: width * 0.35, y: height * 0.045 },
    { x: width * 0.5, y: height * 0.045 },
    { x: width * 0.65, y: height * 0.045 },
    { x: width * 0.8, y: height * 0.045 },
  ]

  if (leaders.length !== 0) {
    context.fillStyle = colorFromSector(BLUE_BLACK)
    context.font = `bold ${width * 0.014}px ${FONT}`
    context.fillText(`Leaders:`, coordinates[0].x, coordinates[0].y)
    context.fillText(`You- ${currentLeader.data?.score || 0}`, coordinates[4].x, coordinates[0].y)

    const length = leaders.length < 3 ? leaders.length : 3
    for (let i = 0; i < length; i++) {
      const name = `${leaders[i].data.name} - ${leaders[i].data.score}`
      context.fillText(`${name}`, coordinates[i + 1].x, coordinates[i + 1].y)
    }
  }
}
