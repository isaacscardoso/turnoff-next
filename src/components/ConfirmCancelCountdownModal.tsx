import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ConfirmCancelCountdownModal.module.css';
    
export function ConfirmCancelCountdownModal() {
    const { cancelCountdown, closeBoxCancelCountdownModal } = useContext(CountdownContext);

    return (
        <div className={styles.overlayConfirmCancelCountdown}>
            <div className={styles.containerConfirmCancelCountdown}>
                <header>Deseja realmente cancelar o ciclo?</header>
                <footer>
                    <button type="button" className={styles.cancelCountdown} onClick={cancelCountdown}>Cancelar</button>
                    <button type="button" className={styles.continueCountdown} onClick={closeBoxCancelCountdownModal}>Continuar</button>
                </footer>
            </div>
        </div>
    );
}
