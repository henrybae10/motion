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

const getstureBoxVariants = {
	hover: (id: string) => {
		return {
			scale: 1.1,
			originX: id === "1" || id === "3" ? "right" : "left",
			originY: id === "1" || id === "2" ? "bottom" : "top",
		};
	},
};

const buttonVariants = {
	click: (click: boolean) => {
		return { scale: click ? 1.2 : 1, color: click ? "tomato" : "black" };
	},
};

const overlay = {
	hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
	visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
	exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

function App() {
	const [id, setId] = useState<null | string>(null);
	const [hoverId, setHoverId] = useState("");
	const [clicked, setClicked] = useState(false);
	const toggleClicked = () => setClicked((prev) => !prev);

	const onHover = (n: string | null) => {
		n === null ? setHoverId("") : setHoverId(n);
	};

	const onClickSwitch = () => {
		toggleClicked();
	};

	return (
		<Wrapper>
			<Grid>
				{["1", "2", "3", "4"].map((n) => (
					<Box
						custom={hoverId}
						variants={getstureBoxVariants}
						whileHover="hover"
						onHoverStart={() => onHover(n)}
						onHoverEnd={() => onHover(null)}
						onClick={() => setId(n)}
						key={n}
						layoutId={n}>
						{n === "2" && !clicked ? (
							<Circle layoutId="circle"></Circle>
						) : n === "3" && clicked ? (
							<Circle layoutId="circle"></Circle>
						) : (
							<></>
						)}
					</Box>
				))}
			</Grid>
			<PracticeLink>
				<SwitchButton
					custom={clicked}
					variants={buttonVariants}
					initial={"free"}
					animate={"click"}
					onClick={onClickSwitch}>
					Switch
				</SwitchButton>
				<MyLink to={`/practice`}>Go To Variants Practice</MyLink>
				<MyLink to={`/slider`}>Go To Slider Practice</MyLink>
				<MyLink to={`/pop`}>Go To Pop Practice</MyLink>
				<MyLink to={`/layoutId`}>Go To layoutId Practice</MyLink>
				<MyLink to={`/layoutIdTwo`}>Go To layoutIdTwo Practice</MyLink>
			</PracticeLink>
			<AnimatePresence>
				{id ? (
					<Overlay
						variants={overlay}
						onClick={() => setId(null)}
						initial="hidden"
						animate="visible"
						exit="exit">
						<Box
							layoutId={id}
							style={{ width: 400, height: 200 }}
						/>
					</Overlay>
				) : null}
			</AnimatePresence>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 100vw;
	padding: 50px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: rgb(131, 75, 215);
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 10px;
`;

const Box = styled(motion.div)`
	width: 300px;
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 40px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
	background-color: blue;
	height: 70px;
	width: 70px;
	place-self: center;
	border-radius: 35px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const SwitchButton = styled(motion.button)`
	padding: 15px;
	appearance: none;
	border: 1px solid white;
	border-radius: 10px;
	background-color: white;
	cursor: pointer;
`;

const PracticeLink = styled.div`
	margin-top: 50px;
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

const Overlay = styled(motion.div)`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default App;
