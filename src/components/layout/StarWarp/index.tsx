import type React from "react";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { TextureLoader } from "three";

const Stars = (): React.ReactElement => {
	const starsRef = useRef<THREE.Points>(null);

	const imgUrl = new URL("/star.png", import.meta.url).href;

	const starPositions = useMemo(() => {
		const positions = [];
		for (let index = 0; index < 6000; index++) {
			const x = Math.random() * 600 - 300;
			const y = Math.random() * 600 - 300;
			const z = Math.random() * 600 - 300;
			positions.push(x, y, z);
		}
		return new Float32Array(positions);
	}, []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const sprite = useMemo(() => new TextureLoader().load(imgUrl), []);

	useFrame(() => {
		if (starsRef.current) {
			starsRef.current.rotation.y += 0.0005;
		}
	});

	return (
		<points ref={starsRef}>
			<bufferGeometry>
				<bufferAttribute
					args={[starPositions, 3]}
					attach="attributes-position"
					count={starPositions.length / 3}
					itemSize={3}
				/>
			</bufferGeometry>
			<pointsMaterial
				sizeAttenuation
				transparent
				alphaTest={0.5}
				color={0xaaaaaa}
				depthWrite={false}
				map={sprite}
				size={0.7}
			/>
		</points>
	);
};

export const StarWarp = (): React.ReactElement => {
	return (
		<Canvas
			camera={{
				position: [0, 0, 1],
				rotation: [Math.PI / 2, 0, 0],
				fov: 60,
			}}
			style={{
				width: "100%",
				height: "100%",
				background: "black",
				position: "fixed",
				top: 0,
				left: 0,
				zIndex: -10,
			}}
		>
			<ambientLight intensity={0.5} />
			<Stars />
		</Canvas>
	);
};

export default StarWarp;
