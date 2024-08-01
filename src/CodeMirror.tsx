import { historyField } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { aura } from "@uiw/codemirror-theme-aura";
import CodeMirror from "@uiw/react-codemirror";

const stateFields = { history: historyField };

function Cm() {
	const serializedState = localStorage.getItem("myEditorState");
	const value =
		localStorage.getItem("myValue") || "console.log('hello world!')";

	return (
		<CodeMirror
			value={value}
			height="40vh"
			theme={aura}
			extensions={[javascript({ jsx: true })]}
			initialState={
				serializedState
					? {
							json: JSON.parse(serializedState || ""),
							fields: stateFields,
					  }
					: undefined
			}
			onChange={(value, viewUpdate) => {
				localStorage.setItem("myValue", value);

				const state = viewUpdate.state.toJSON(stateFields);
				localStorage.setItem("myEditorState", JSON.stringify(state));
			}}
		/>
	);
}
export default Cm;
