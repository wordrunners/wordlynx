import React, { FC, useState, useEffect } from 'react'
import { passwordAPI } from '@/api/passwordApi'
import type { User } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { LinkButton } from '@/components/LinkButton'
import avatar from '@/assets/images/avatar.png'
import './changePasswordPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, changePass } from '@/store/userSlice'
import { AppDispatch } from '@/store/store'
import { API } from "@/data/api"

export const ChangePasswordPage: FC<User> = () => {

  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const avatarUser = user.avatar
    ? `${API}/resources${user.avatar}`
    : avatar

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [oldPasswordDirty, setOldPasswordDirty] = useState(false)
  const [newPasswordDirty, setNewPasswordDirty] = useState(false)
  const [response, setResponse] = useState('')
  const [responseColor, setResponseColor] = useState('')

  const [oldPasswordError, setOldPasswordError] = useState(
    'The password field cannot be empty.'
  )
  const [newPasswordError, setNewPasswordError] = useState(
    'The password field cannot be empty.'
  )
  const [formValid, setformValid] = useState(false)

  useEffect(() => {
    if (oldPasswordError || newPasswordError) {
      setformValid(false)
    } else {
      setformValid(true)
    }
  }, [oldPasswordError, newPasswordError])

  const oldPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value)

    const PASSWORD = /^((?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{8,16})$/
    if (!PASSWORD.test(String(e.target.value))) {
      setOldPasswordError(
        'The password must be written in Latin characters from 8 to 15 characters, one number and one capital letter are required.'
      )
      if (!e.target.value) {
        setOldPasswordError('The old password field cannot be empty')
      }
    } else {
      setOldPasswordError('')
    }
  }

  const newPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
    const PASSWORD = /^((?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{8,16})$/
    if (!PASSWORD.test(String(e.target.value))) {
      setNewPasswordError(
        'The password must be written in Latin characters from 8 to 15 characters, one number and one capital letter are required.'
      )
      if (!e.target.value) {
        setNewPasswordError('The new password field cannot be empty')
      }
    } else {
      setNewPasswordError('')
    }
  }

  const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'oldPassword':
        setOldPasswordDirty(true)
        break
      case 'newPassword':
        setNewPasswordDirty(true)
        break
    }
  }

  const passwordUp = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault()
    dispatch(changePass(newPassword))
    const responseText = await passwordAPI({
      oldPassword: oldPassword,
      newPassword: newPassword,
    })
    if (responseText === 'password changed') {
      setResponse('Password changed')
      setResponseColor('green')
    } else {
      setResponse('Error')
      setResponseColor('red')
    }
  }

  return (
    <div className="wrap">
      <div className="avatar">
        <img src={avatarUser} alt={`User avatar ${user.displayName}`} />
      </div>
      <div className="card">
        <form className="card__form">
          <h1>Change password</h1>
          <div className="input">
            <input
              value={oldPassword}
              onChange={e => oldPasswordHandler(e)}
              onBlur={e => blurHandler(e)}
              name="oldPassword"
              type="password"
              placeholder="Enter old password"
              className="input__field"
            />
            <label className="input__label">Old Password</label>
            {oldPasswordDirty && oldPasswordError && (
              <div style={{ color: 'red' }}>{oldPasswordError}</div>
            )}
          </div>
          <div className="input">
            <input
              value={newPassword}
              onChange={e => newPasswordHandler(e)}
              onBlur={e => blurHandler(e)}
              name="newPassword"
              type="password"
              placeholder="Enter new password"
              className="input__field"
            />
            <label className="input__label">New Password</label>
            {newPasswordDirty && newPasswordError && (
              <div style={{ color: 'red' }}>{newPasswordError}</div>
            )}
          </div>
          <div className="action">
            <div style={{ color: responseColor }} className="response">
              {response}
            </div>
            <Button
              disabled={!formValid}
              type="submit"
              className="action__button"
              onClick={passwordUp}
              children="Change"
            />
            <LinkButton to="/profile" children="Back" modifier="back" />
          </div>
        </form>
      </div>
    </div>
  )
}
