import React from 'react'

export const user = {
  id: '31',
  login: 'Hinton',
  firstName: 'Geoffrey',
  secondName: 'Hinton',
  displayName: 'Hinton',
  avatar:
    '/46f3061f-ca1f-4a29-8f0e-a921109bdc10/24b0e54b-9e9f-4e8e-94d7-dfd129a4d58a_round-avatar.png',
  phone: '+1111111111',
  email: 'test@test.test',
}
export const AppContext = React.createContext(user)
