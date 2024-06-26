import {
	AnimatePresence,
	delay,
	motion,
	px,
	useMotionValue,
	useScroll,
	useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const boxVariants = {
	initial: {
		opacity: 0,
		scale: 0,
	},
	visible: {
		opacity: 1,
		scale: 1,
		rotateZ: 360,
	},
	leaving: {
		opacity: 0,
		scale: 0,
		y: 50,
	},
};

function Pop() {
	const [showing, setShowing] = useState(false);
	const toggleShowing = () => {
		setShowing((prev) => !prev);
	};

	return (
		<Wrapper>
			<AnimatePresence>
				{showing ? (
					<Box
						variants={boxVariants}
						initial="initial"
						animate="visible"
						exit="leaving"></Box>
				) : null}
			</AnimatePresence>
			<PracticeLink>
				<button onClick={toggleShowing}>Click</button>
			</PracticeLink>
		</Wrapper>
	);
}

const Wrapper = styled(motion.div)`
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgb(131, 75, 215);
`;

const Box = styled(motion.div)`
	width: 400px;
	height: 200px;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 40px;
	position: absolute;
	top: 100px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const PracticeLink = styled.div`
	margin-top: 200px;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const MyLink = styled(Link)`
	padding: 10px;
	background-color: white;
	border: 1px solid blue;
	border-radius: 10px;
`;

export default Pop;
