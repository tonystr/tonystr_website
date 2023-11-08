import { useEffect } from 'react';
import styles from './HomeRoute.module.scss';
import './HomeRoute.scss';
import IconPlanetDash from '@/assets/planet-dash.svg?react';
import { useRef } from 'react';

export default function HomeRoute() {
	const cursorBlob = useRef(null);

	useEffect(() => {
		if (cursorBlob.current === null) return;
		document.body.addEventListener('mousemove', (e) => {
			cursorBlob.current.animate({
				left: `${e.clientX - 400}px`,
				top:  `${e.clientY - 400}px`,
			}, { duration: 7000, fill: 'forwards' });
		});
	}, [cursorBlob]);

    return (
        <div className="home">
			<div className="planet-container">
				<h1 className="main-heading">
					<span>T</span>
					<span>o</span>
					<span>n</span>
					<span>y</span>
					&nbsp;
					<span>S</span>
					<span>t</span>
					<span>r</span>
					<span>ø</span>
					<span>m</span>
					<span>s</span>
					<span>n</span>
					<span>æ</span>
					<span>s</span>
				</h1>
				<IconPlanetDash className={styles.planet} />
			</div>
			<div
				className="cursor-blob"
				data-loaded={cursorBlob.current !== null}
				ref={cursorBlob}
			/>
			<div className="blur-bg" />
        </div>
    );
}
