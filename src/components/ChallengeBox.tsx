import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
    const contextData = useContext(ChallengesContext);

    const hasActiveChallenge = true;
    
    return (
        <div className={styles.challengeBoxContainer}>
            { hasActiveChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe 400 xp</header>
                    <main>
                        <img src="icons/body.svg" alt="Body icon"/>
                        <strong>Novo desafio</strong>
                        <p>Levante-se e alongue os braços e pernas.</p>
                    </main>
                    <footer>
                        <button type="button" className={styles.challengeFailedButton}>Falhei</button>
                        <button type="button" className={styles.challengeSucceededButton}>Completei</button>
                    </footer>
                </div>
            ) : (
                    <div className={styles.challengeNotActive}>
                        <strong>Termine um ciclo para receber um novo desafio</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="LevelUp photo" />
                            Suba de nível completando desafios.
                        </p>
                    </div>
                )}
        </div>
    );
}