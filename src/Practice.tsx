import {
	delay,
	motion,
	px,
	useMotionValue,
	useScroll,
	useTransform,
} from "framer-motion";
import { useRef } from "react";
import styled from "styled-components";

const basicVariants = {
	start: { scale: 0 },
	end: { scale: 1, rotateZ: 360, transition: { type: "spring", delay: 0.5 } },
};

const circleBoxVariants = {
	start: {
		scale: 0,
		opacity: 0,
	},
	end: {
		scale: 1,
		opacity: 1,
		transition: {
			type: "spring",
			delayChildren: 0.5,
			staggerChildren: 0.3,
			duration: 0.5,
			bounce: 0.5,
		},
	},
};

const circleVariants = {
	start: {
		opacity: 0,
		y: 10,
	},
	end: {
		opacity: 1,
		y: 0,
	},
};

const getstureBoxVariants = {
	hover: { scale: 1.5, rotateZ: 90 },
	tap: { scale: 1, borderRadius: "100px" },
};

const dragBoxVariants = {
	drag: { backgroundColor: "rgb(46, 203, 13)", transition: { duration: 2 } },
};

const svgVariants = {
	start: { pathLength: 0, fill: "rgba(255,255,255,0)" },
	end: {
		pathLength: 1,
		fill: "#ead883",
	},
};

function Practice() {
	const biggerBoxRef = useRef<HTMLDivElement>(null);

	const x = useMotionValue(0);
	const scaleBasic = useTransform(x, [-700, 0, 700], [2, 1, 0.1]);
	const rotateZ = useTransform(x, [-700, 700], [-360, 360]);
	const gradient = useTransform(
		x,
		[-700, 0, 700],
		[
			"linear-gradient(135deg,rgb(131, 75, 215), rgb(11, 66, 100))",
			"linear-gradient(135deg,rgb(175, 55, 151), rgb(80, 5, 79))",
			"linear-gradient(135deg,rgb(52, 191, 149), rgb(89, 227, 15))",
		]
	);
	const { scrollY, scrollYProgress } = useScroll();
	const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);

	return (
		<Wrapper style={{ background: gradient }}>
			<AnimationBox>
				<Box variants={basicVariants} initial="start" animate="end" />
				<CircleBox
					variants={circleBoxVariants}
					initial="start"
					animate="end">
					<Circle variants={circleVariants}></Circle>
					<Circle variants={circleVariants}></Circle>
					<Circle variants={circleVariants}></Circle>
					<Circle variants={circleVariants}></Circle>
				</CircleBox>
				<GestureBox
					variants={getstureBoxVariants}
					whileHover="hover"
					whileTap="tap"
				/>
				<BiggerBoxForDragBox ref={biggerBoxRef}>
					{/*drag="x"*/}
					<DragBox
						drag
						dragConstraints={biggerBoxRef /*left: 0, right: 0 */}
						dragSnapToOrigin
						dragElastic={0.5}
						variants={dragBoxVariants}
						whileDrag={"drag"}
					/>
				</BiggerBoxForDragBox>
				<MotionValueBox
					style={{ x, scale, rotateZ }}
					drag="x"
					dragSnapToOrigin
				/>
				<SvgBox>
					<MySvg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512">
						<motion.path
							variants={svgVariants}
							initial={"start"}
							animate={"end"}
							transition={{
								default: { duration: 1 },
								fill: { delay: 1, duration: 1 },
							}}
							fill="transparent"
							d="M224 373.1c-25.2-31.7-40.1-59.4-45-83.2-22.6-88 112.6-88 90.1 0-5.5 24.3-20.3 52-45 83.2zm138.2 73.2c-42.1 18.3-83.7-10.9-119.3-50.5 103.9-130.1 46.1-200-18.9-200-54.9 0-85.2 46.5-73.3 100.5 6.9 29.2 25.2 62.4 54.4 99.5-32.5 36.1-60.6 52.7-85.2 54.9-50 7.4-89.1-41.1-71.3-91.1 15.1-39.2 111.7-231.2 115.9-241.6 15.8-30.1 25.6-57.4 59.4-57.4 32.3 0 43.4 25.9 60.4 59.9 36 70.6 89.4 177.5 114.8 239.1 13.2 33.1-1.4 71.3-37 86.6zm47-136.1C280.3 35.9 273.1 32 224 32c-45.5 0-64.9 31.7-84.7 72.8C33.2 317.1 22.9 347.2 22 349.8-3.2 419.1 48.7 480 111.6 480c21.7 0 60.6-6.1 112.4-62.4 58.7 63.8 101.3 62.4 112.4 62.4 62.9 .1 114.9-60.9 89.6-130.2 0-3.9-16.8-38.9-16.8-39.6z"
						/>
					</MySvg>
				</SvgBox>
			</AnimationBox>
		</Wrapper>
	);
}

const Wrapper = styled(motion.div)`
	height: 150vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const AnimationBox = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20px;
`;

const Box = styled(motion.div)`
	width: 200px;
	height: 200px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const CircleBox = styled(motion.div)`
	width: 200px;
	height: 200px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	background-color: lightgrey;
	border-radius: 10px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
	background-color: white;
	height: 70px;
	width: 70px;
	place-self: center;
	border-radius: 35px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const GestureBox = styled(motion.div)`
	width: 200px;
	height: 200px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BiggerBoxForDragBox = styled.div`
	width: 200px;
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	background-color: lightgrey;
	overflow: hidden;
`;

const DragBox = styled(motion.div)`
	width: 100px;
	height: 100px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const MotionValueBox = styled(motion.div)`
	width: 200px;
	height: 200px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const SvgBox = styled(motion.div)`
	width: 200px;
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const MySvg = styled.svg`
	width: 150px;
	height: 150px;
	path {
		stroke: red;
		stroke-width: 15px;
	}
`;

export default Practice;
