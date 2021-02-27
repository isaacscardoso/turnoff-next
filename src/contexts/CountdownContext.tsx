import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengesContext';
import { ConfirmCancelCountdownModal } from '../components/ConfirmCancelCountdownModal';

interface CountdownContextData {
    minutes: number
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
    cancelCountdown: () => void;
    boxCancelCountdown: () => void;
    closeBoxCancelCountdownModal: () => void;
}

interface CountdownProviderProps {
    children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);
    const { resetChallenge } = useContext(ChallengesContext);

    const minutesRemaining : number = 25 * 60;
    
    const [time, setTime] = useState(minutesRemaining);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const [isBoxCancelCountdownModalOpen, setBoxCancelCountdownModalOpen] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(minutesRemaining);
        setHasFinished(false);
    }

    function cancelCountdown() {
        resetCountdown();
        resetChallenge();
        closeBoxCancelCountdownModal();
    }

    function boxCancelCountdown() {
        setBoxCancelCountdownModalOpen(true);
    }

    function closeBoxCancelCountdownModal() {
        setBoxCancelCountdownModalOpen(false);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time == 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    return (
        <CountdownContext.Provider
            value={{
                minutes,
                seconds,
                hasFinished,
                isActive,
                startCountdown,
                resetCountdown,
                cancelCountdown,
                boxCancelCountdown,
                closeBoxCancelCountdownModal
            }}
        >
            {children}

            { isBoxCancelCountdownModalOpen && <ConfirmCancelCountdownModal />}
        </CountdownContext.Provider>
    )
}
