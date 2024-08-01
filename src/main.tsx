import React from "react";
import ReactDOM from "react-dom/client";
import Cm from "./CodeMirror.tsx";
import Gjs from "./Gjs.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Gjs />
		<Cm />
	</React.StrictMode>
);
