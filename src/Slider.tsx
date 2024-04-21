import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-color: tomato;
`;

const Box = styled(motion.div)`
	width: 400px;
	height: 200px;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 40px;
	position: absolute;
	top: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 28px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const box = {
	invisible: (isBack: boolean) => {
		return {
			x: isBack ? -500 : 500,
			opacity: 0,
			scale: 0,
		};
	},
	visible: {
		x: 0,
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.3,
		},
	},
	exit: (isBack: boolean) => {
		return {
			x: isBack ? 500 : -500,
			opacity: 0,
			scale: 0,
			transition: { duration: 0.3 },
		};
	},
};

function Slider() {
	const [visible, setVisible] = useState(1);
	const [isBack, setIsBack] = useState(false);

	const nextPlease = () =>
		setVisible((prev) => {
			setIsBack(false);
			return prev === 10 ? 10 : prev + 1;
		});
	const prevPlease = () =>
		setVisible((prev) => {
			setIsBack(true);
			return prev === 1 ? 1 : prev - 1;
		});
	return (
		<Wrapper>
			<AnimatePresence mode="wait" custom={isBack}>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) =>
					i === visible ? (
						<Box
							custom={isBack}
							variants={box}
							initial="invisible"
							animate="visible"
							exit="exit"
							key={i}>
							{i}
						</Box>
					) : null
				)}
			</AnimatePresence>
			<button onClick={nextPlease}>next</button>
			<button onClick={prevPlease}>prev</button>
		</Wrapper>
	);
}

export default Slider;
