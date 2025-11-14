import { useSelector } from 'react-redux'
import { selectLoading, selectUser } from '@/store/authSlice';
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks";
import { fetchUser } from '@/store/authSlice';
import { Togglers } from '@/components/Togglers';

import './Splash.scss';

export const Splash = (): JSX.Element => {
  const loading = useSelector(selectLoading);
  const user = useSelector(selectUser)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [user]);

  return (
    loading
      ? <section className="splash">
        <div className="splash__circle"></div>
        <h3 className="splash__title">Loading...</h3>
      </section>
      : <Togglers />
  );
};
