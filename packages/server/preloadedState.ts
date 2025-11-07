import type { ProfileState } from 'client/src/types'
import type { LeaderBoard } from 'client/src/types'
import type { Game } from 'client/src/types'
import type { AuthState } from 'client/src/types'

const authState: AuthState = {
  isAuth: false,
  user: null,
  loading: false
};

const userState: ProfileState = {
  profile: {
    avatar: '',
    email: 'test@test.test',
    login: 'Hinton',
    firstName: 'Geoffrey',
    secondName: 'Hinton',
    displayName: 'Hinton',
    phone: '+1111111111',
  },
  status: null,
  error: null,
}

const leaderBoardState: LeaderBoard = {
  leaders: [],
  activeLeader: -1,
  loading: false,
  error: null,
}

const gameState: Game = {
  totalPlayers: -1,
  activePlayer: 0,
  activeCard: 0,
  cards: [],
  word: '',
  points: 0,
  status: 'start',
  width: 0,
  height: 0,
  card: null,
  timer: 0,
  timeou: null,
  players: [],
  settings: 'default',
  activeSettings: 'default',
  bumble: 'default'
}

export const PRELOADED_STATE = {
  auth: authState,
  leaderBoard: leaderBoardState,
  game: gameState,
  user: userState,
}
