import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Practice from "./Practice";
import Slider from "./Slider";
import Pop from "./Pop";
import LayoutId from "./LayoutId";
import LayoutIdTwo from "./LayoutIdTwo";

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/practice" element={<Practice />} />
				<Route path="/slider" element={<Slider />} />
				<Route path="/pop" element={<Pop />} />
				<Route path="/layoutId" element={<LayoutId />} />
				<Route path="/layoutIdTwo" element={<LayoutIdTwo />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
