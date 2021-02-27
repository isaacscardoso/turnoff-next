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
    confirmCancelCountdown: () => void;
    closeConfirmCancelCountdownModal: () => void;
}

interface CountdownProviderProps {
    children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const minutesRemaining : number = 0.05 * 60;
    
    const [time, setTime] = useState(minutesRemaining);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const [isConfirmCancelCountdownModalOpen, setConfirmCancelCountdownModalOpen] = useState(false);

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
        closeConfirmCancelCountdownModal();
    }

    function confirmCancelCountdown() {
        setConfirmCancelCountdownModalOpen(true);
    }

    function closeConfirmCancelCountdownModal() {
        setConfirmCancelCountdownModalOpen(false);
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
                confirmCancelCountdown,
                closeConfirmCancelCountdownModal
            }}
        >
            {children}

            { isConfirmCancelCountdownModalOpen && <ConfirmCancelCountdownModal />}
        </CountdownContext.Provider>
    )
}