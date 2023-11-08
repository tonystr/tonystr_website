import styles from './HomeRoute.module.scss';
import IconPlanetDash from '@/assets/planet-dash.svg?react';

export default function HomeRoute() {
    return (
        <div className={styles.home}>
			<div className={styles.planetContainer}>
				<h1 className={styles.mainHeading}>
					Tony Strømsnæs
				</h1>
				<IconPlanetDash className={styles.planet} />
			</div>
        </div>
    );
}
