import { createRoot } from "react-dom/client";
import Options from "./Options";

function init() {
	const appContainer = document.querySelector("#app");
	if (!appContainer) {
		throw new Error("Can not find AppContainer");
	}
	const root = createRoot(appContainer);
	root.render(<Options />);
}

init();
