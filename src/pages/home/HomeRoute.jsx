import styles from './HomeRoute.module.scss';

export default function HomeRoute() {
    return (
        <div className={styles.home}>
            <h1>Home</h1>
            <div
                style={{
                    position: 'absolute',
                }}
                className={styles.X}
            >
                X
            </div>
        </div>
    );
}
