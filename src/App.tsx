import GjsEditor, {
	AssetsProvider,
	Canvas,
	ModalProvider,
} from "@grapesjs/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { EditorConfig, type Editor } from "grapesjs";
import basicBlocksPlugin from "./components/block-components/blocks-basic";
import customCodePlugin from "./components/block-components/components-custom-code";
import formPlugin from "./components/block-components/components-forms";
import { MAIN_BORDER_COLOR } from "./components/common";
import CustomAssetManager from "./components/CustomAssetManager";
import CustomModal from "./components/CustomModal";
import RightSidebar from "./components/RightSidebar";
import Topbar from "./components/Topbar";

const theme = createTheme({
	palette: {
		mode: "dark",
	},
});

const gjsOptions: EditorConfig = {
	height: "100vh",
	storageManager: false,
	undoManager: { trackSelection: false },
	selectorManager: { componentFirst: true },
	projectData: {
		assets: [
			"https://via.placeholder.com/350x250/78c5d6/fff",
			"https://via.placeholder.com/350x250/459ba8/fff",
			"https://via.placeholder.com/350x250/79c267/fff",
			"https://via.placeholder.com/350x250/c5d647/fff",
			"https://via.placeholder.com/350x250/f28c33/fff",
		],
		pages: [
			{
				name: "Home page",
				component: `<h1>GrapesJS React Custom UI</h1>`,
			},
		],
	},
	plugins: [basicBlocksPlugin, formPlugin, customCodePlugin],
	pluginsOpts: {
		customCodePlugin: {
			blockCustomCode: {
				label: "Custom Code",
				category: "Extra",
			},
		},
	},
};

function App() {
	const onEditor = (editor: Editor) => {
		console.log("Editor loaded", { editor });
		(window as any).editor = editor;
	};

	return (
		<ThemeProvider theme={theme}>
			<GjsEditor
				className="gjs-custom-editor text-white bg-gradient-to-r from-emerald-700 to-emerald-900"
				grapesjs="https://unpkg.com/grapesjs"
				grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
				options={gjsOptions}
				onEditor={onEditor}
			>
				<div className={`flex h-full border-t ${MAIN_BORDER_COLOR}`}>
					<div className="gjs-column-m flex flex-col flex-grow">
						<Topbar className="min-h-[48px]" />
						<Canvas className="flex-grow gjs-custom-editor-canvas" />
					</div>
					<RightSidebar
						className={`gjs-column-r w-[300px] border-l ${MAIN_BORDER_COLOR}`}
					/>
				</div>
				<ModalProvider>
					{({ open, title, content, close }) => (
						<CustomModal
							open={open}
							title={title}
							children={content}
							close={close}
						/>
					)}
				</ModalProvider>
				<AssetsProvider>
					{({ assets, select, close, Container }) => (
						<Container>
							<CustomAssetManager
								assets={assets}
								select={select}
								close={close}
							/>
						</Container>
					)}
				</AssetsProvider>
			</GjsEditor>
		</ThemeProvider>
	);
}

export default App;
