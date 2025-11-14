import React, { FC } from 'react'
import type { User } from '@/types/user'
import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { LinkButton } from '@/components/LinkButton'
import './profilePage.scss'
import { ChangeData } from '@/components/ChangeData'
import { useDispatch, useSelector } from 'react-redux'
import { changeProfile, profileLoading } from '@/store/userSlice'
import { useInput } from '@/hooks'
import { AppDispatch } from '@/store/store'
import { selectUser } from '@/store/authSlice';
import { transformUserDTOtoUser } from '@/utils';

export const ProfileData: FC = () => {

  const userState = useSelector(selectUser);
  const user = transformUserDTOtoUser(userState);

  const dispatch = useDispatch<AppDispatch>();

  const email = useInput(user.email, { isEmail: true });
  const login = useInput(user.login, { isLogin: true });
  const firstName = useInput(user.firstName, { isName: true });
  const secondName = useInput(user.secondName, { isName: true });
  const displayName = useInput(user.displayName, { isName: true });
  const phone = useInput(user.phone, { isPhone: true });

  const handleSubmitForm = (e: any) => {

    e.preventDefault();

    const changeProfileData: User = {
      email: e.target[0].value,
      login: e.target[1].value,
      firstName: e.target[2].value,
      secondName: e.target[3].value,
      displayName: e.target[4].value,
      phone: e.target[5].value,

    }
    dispatch(profileLoading);

    dispatch(changeProfile(changeProfileData));
  }

  return (
    <div>
      <Avatar displayName={user.displayName} avatar={user.avatar} />
      <form className='change__form' onSubmit={handleSubmitForm}>
        <div className="change__form-list">
          {(email.isDirty && email.emailError) && <div className='error'>Incorrect email</div>}
          <ChangeData onChange={(e: React.ChangeEvent<HTMLInputElement>) => email.onChange(e)} onBlur={() => email.onBlur()} value={email.value} title='Email' type='text' name={'email'} placeholder={user.email} />

          {(login.isDirty && login.loginError) && <div className='error'>Login must be written in Latin characters from 3 to 20 characters, may contain numbers, hyphens and underscores</div>}
          <ChangeData onChange={(e: React.ChangeEvent<HTMLInputElement>) => login.onChange(e)} onBlur={() => login.onBlur()} value={login.value} title='Login' type='text' name={'login'} placeholder={user.login} />

          {(firstName.isDirty && firstName.nameError) && <div className='error'>First name must start with a capital letter and be more than 1 letter</div>}
          <ChangeData onChange={(e: React.ChangeEvent<HTMLInputElement>) => firstName.onChange(e)} onBlur={() => firstName.onBlur()} value={firstName.value} title='First Name' type='text' name={'firstName'} placeholder={user.firstName} />

          {(secondName.isDirty && secondName.nameError) && <div className='error'>Last name must start with a capital letter and be more than 1 letter</div>}
          <ChangeData onChange={(e: React.ChangeEvent<HTMLInputElement>) => secondName.onChange(e)} onBlur={() => secondName.onBlur()} value={secondName.value} title='Last Name' type='text' name={'secondName'} placeholder={user.secondName} />

          {(displayName.isDirty && displayName.nameError) && <div className='error'>Display name must start with a capital letter and be more than 1 letter</div>}
          <ChangeData onChange={(e: React.ChangeEvent<HTMLInputElement>) => displayName.onChange(e)} onBlur={() => displayName.onBlur()} value={displayName.value} title='Display Name' type='text' name={'displayName'} placeholder={user.displayName} />

          {(phone.isDirty && phone.nameError) && <div className='error'>Phone number must be valid and start with 8 or +</div>}
          <ChangeData onChange={(e: React.ChangeEvent<HTMLInputElement>) => phone.onChange(e)} onBlur={() => phone.onBlur()} value={phone.value} title='Phone' type='text' name={'phone'} placeholder={user.phone} />
        </div>

        <Button
          type="submit"
          className="action__button"
          children="Replace"
        />
        <LinkButton to="/change-password" children="Change password" modifier="back" />
        <LinkButton to="/" children="Back" modifier="back" />
      </form>
    </div>
  )
}
