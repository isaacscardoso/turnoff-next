import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const { level } = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/isaacscardoso.png" alt="Isaac's photo" />
            <div>
                <strong>Isaac Cardoso Silva</strong>
                <p>
                    <img src="icons/level.svg" alt="Icon level" />
                    Level {level}
                </p>
            </div>
        </div>
    );
}