import cn from 'classnames';
import Logo from '@/assets/images/logo.png';
import './startPage.scss';
import { LinkButton } from '@/components/LinkButton';
import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { useEffect } from 'react'
import {
  useAppDispatch,
  useAuth
} from '@/hooks'
import { logout, signinOAuth } from '@/store/authSlice';
import { addPlayer } from '@/pages/gamePage/game/core/gameSlice';
import {
  SIGNIN_ROUTE,
  GAME_ROUTE
} from '@/data/routes'

export const StartPage = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { isAuth } = useAuth()

  function onExit() {
    dispatch(logout());
    dispatch(addPlayer({
      'login': '',
      'words': [],
      'score': 0,
      'enabled': true
    }))
  }

  useEffect(() => {
    const code = new URLSearchParams(globalThis.window?.location.search).get('code');

    if (code) {
      dispatch(signinOAuth({ code, redirect_uri: 'https://wordrunners-bumble-20.ya-praktikum.tech/' }));
    } else {
      return
    }
  }, []);

  return (
    <section className={cn('start')}>
      <Header />
      <div className={cn('start__wrapper')}>
        <img src={Logo} alt='logo' className={cn('start__logo')} />
        <LinkButton to={GAME_ROUTE} modifier='game-btn'>START GAME</LinkButton>
        {isAuth ? (
          <Button className="exit-btn" onClick={onExit}>EXIT</Button>
        ) : (
          <LinkButton to={SIGNIN_ROUTE} modifier='login-btn'>LOGIN</LinkButton>
        )}
      </div>
    </section>
  )
};
