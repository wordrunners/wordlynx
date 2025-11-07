import { Popup } from "../Popup";
import './GameRules.scss';

interface Props {
    open: boolean;
    onClose: () => void
}
export const GameRules = ({ open, onClose }: Props): JSX.Element => {
    return (
        <Popup
            title='RULES'
            isOpen={open}
            onClose={onClose}
        >
            <div className='rules'>
                <p className='rules__text'>
                    Wordlynx is a very simple and fast word game.
                </p>
                <p className='rules__text'>
                    Collect a word from the letters in one minute. The longer the word, the better. After all, you earn victory points for each letter.
                </p>
                <p className='rules__text'>
                    Each letter can be used in the word exactly as many times as it appears on the card.
                </p>
            </div>
        </Popup>
    );
};
