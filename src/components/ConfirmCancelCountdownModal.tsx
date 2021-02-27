import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ConfirmCancelCountdownModal.module.css';
    
export function ConfirmCancelCountdownModal() {
    const { resetCountdown, closeConfirmCancelCountdownModal } = useContext(CountdownContext);

    return (
        <div className={styles.overlayConfirmCancelCountdown}>
            <div className={styles.containerConfirmCancelCountdown}>
                <header>Deseja realmente cancelar o ciclo?</header>
                <footer>
                    <button type="button" className={styles.cancelCountdown} onClick={resetCountdown}>Cancelar</button>
                    <button type="button" className={styles.continueCountdown} onClick={closeConfirmCancelCountdownModal}>Continuar</button>
                </footer>
            </div>
        </div>
    );
}
