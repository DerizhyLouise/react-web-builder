import GjsEditor from "@grapesjs/react";
import grapesjs, { Editor } from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import basicBlocksPlugin from "./components/blocks-basic";
import customCodePlugin from "./components/components-custom-code";
import formPlugin from "./components/components-forms";

function App() {
	const onEditor = (editor: Editor) => {
		console.log("Editor loaded", { editor });
	};

	return (
		<GjsEditor
			grapesjs={grapesjs}
			grapesjsCss="grapes.min.css"
			options={{
				height: "100vh",
				storageManager: false,
			}}
			onEditor={onEditor}
			plugins={[
				gjsPresetWebpage,
				basicBlocksPlugin,
				formPlugin,
				customCodePlugin,
			]}
		/>
	);
}

export default App;
