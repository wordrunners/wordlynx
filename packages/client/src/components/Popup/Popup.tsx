import { FC, ReactNode } from "react";
import CloseIcon from '@/assets/icons/close-icon.svg';
import { Button } from "../Button";
import cn from 'classnames';
import './Popup.scss';

interface Props {
    title?: string;
    buttonName?: string;
    onClose: () => void;
    children: ReactNode;
    isOpen: boolean;
    onSubmit?: () => void;
}

export const Popup: FC<Props> = ({
    title, children, onSubmit, onClose, buttonName = 'It\'s clear', isOpen,
}): JSX.Element => {

    const handleSubmit = (): void => {
        onSubmit && onSubmit();
        onClose();
    };

    const handleOverlayClose = (e: any): void => {
        if (e.target !== e.currentTarget) {
            return;
        }
        onClose();
    };

    return (
        <section className={cn('popup', { 'popup_opened': isOpen })} onClick={handleOverlayClose}>
            <div className="popup__container">
                <div onClick={onClose} className='popup__close'>
                    <img src={CloseIcon} className='popup__close-icon' alt='close' />
                </div>
                <h2 className="popup__title">{title}</h2>
                {children}
                <Button onClick={handleSubmit}>{buttonName}</Button>
            </div>
        </section>
    )
};
