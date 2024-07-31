import type { Editor } from "grapesjs";

type PluginOptions = {
	/**
	 * Which blocks to add.
	 * @default ['link-block', 'quote', 'text-basic']
	 */
	blocks?: string[];

	/**
	 * Add custom block options, based on block id.
	 * @default (blockId) => ({})
	 * @example (blockId) => blockId === 'quote' ? { attributes: {...} } : {};
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	block?: (blockId: string) => {};

	/**
	 * Modal import title.
	 * @default 'Import'
	 */
	modalImportTitle?: string;

	/**
	 * Modal import button text.
	 * @default 'Import'
	 */
	modalImportButton?: string;

	/**
	 * Import description inside import modal.
	 * @default ''
	 */
	modalImportLabel?: string;

	/**
	 * Default content to setup on import model open.
	 * Could also be a function with a dynamic content return (must be a string).
	 * @default ''
	 * @example editor => editor.getHtml()
	 */
	modalImportContent?: string | ((editor: Editor) => string);

	/**
	 * Code viewer (eg. CodeMirror) options.
	 * @default {}
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	importViewerOptions?: Record<string, any>;

	/**
	 * Confirm text before clearing the canvas.
	 * @default 'Are you sure you want to clear the canvas?'
	 */
	textCleanCanvas?: string;

	/**
	 * Show the Style Manager on component change.
	 * @default true
	 */
	showStylesOnChange?: boolean;

	/**
	 * Load custom preset theme.
	 * @default true
	 */
	useCustomTheme?: boolean;
};

type RequiredPluginOptions = Required<PluginOptions>;

export default (editor: Editor, config: RequiredPluginOptions) => {
	const pfx = editor.getConfig("stylePrefix");
	const importLabel = config.modalImportLabel;
	const importCnt = config.modalImportContent;

	editor.Commands.add("gjs-open-import-webpage", {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		codeViewer: null as any,
		container: null as HTMLElement | null,

		run(editor) {
			const codeContent =
				typeof importCnt == "function" ? importCnt(editor) : importCnt;
			const codeViewer = this.getCodeViewer();
			editor.Modal.open({
				title: config.modalImportTitle,
				content: this.getContainer(),
			}).onceClose(() => editor.stopCommand("gjs-open-import-webpage"));
			codeViewer.setContent(codeContent ?? "");
			codeViewer.refresh();
			setTimeout(() => codeViewer.focus(), 0);
		},

		stop() {
			editor.Modal.close();
		},

		getContainer() {
			if (!this.container) {
				const codeViewer = this.getCodeViewer();
				const container = document.createElement("div");
				container.className = `${pfx}import-container`;

				// Import Label
				if (importLabel) {
					const labelEl = document.createElement("div");
					labelEl.className = `${pfx}import-label`;
					labelEl.innerHTML = importLabel;
					container.appendChild(labelEl);
				}

				container.appendChild(codeViewer.getElement());

				// Import button
				const btnImp = document.createElement("button");
				btnImp.type = "button";
				btnImp.innerHTML = config.modalImportButton;
				btnImp.className = `${pfx}btn-prim ${pfx}btn-import`;
				btnImp.onclick = () => {
					editor.Css.clear();
					editor.setComponents(codeViewer.getContent().trim());
					editor.Modal.close();
				};
				container.appendChild(btnImp);

				this.container = container;
			}

			return this.container;
		},

		/**
		 * Return the code viewer instance
		 * @returns {CodeViewer}
		 */
		getCodeViewer() {
			if (!this.codeViewer) {
				this.codeViewer = editor.CodeManager.createViewer({
					codeName: "htmlmixed",
					theme: "hopscotch",
					readOnly: false,
					...config.importViewerOptions,
				});
			}

			return this.codeViewer;
		},
	});
};
