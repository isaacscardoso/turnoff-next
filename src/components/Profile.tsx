import styles from '../styles/components/Profile.module.css';

export function Profile() {
    return (
        <div className={ styles.profileContainer }>
            <img src="https://github.com/isaacscardoso.png" alt="Isaac's photo"/>
            <div>
                <strong>Isaac Cardoso Silva</strong>
                <p>
                    <img src="icons/level.svg" alt="Icon level"/>
                    Level 1
                </p>
            </div>
        </div>
    );
}