import React, { ReactElement, useRef, useState } from "react";
import {
	Editor,
	EditorState,
	convertFromHTML,
	convertToRaw,
	ContentState,
	RichUtils,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import Colors from "../../constants/colors";

interface Props {
	setContent: Function;
	initialContent?: string;
	placeholder?: string;
}

export default function DraftEditor({
	setContent,
	initialContent,
	placeholder,
}: Props): ReactElement {
	function transformRawHtml(rawHtml) {
		const blocksFromHTML = convertFromHTML(rawHtml);
		const state = ContentState.createFromBlockArray(
			blocksFromHTML.contentBlocks,
			blocksFromHTML.entityMap
		);
		return state;
	}
	const [editorState, editorStateSet] = useState(
		initialContent
			? transformRawHtml(initialContent)
			: EditorState.createEmpty()
	);

	const editor = useRef(null);

	function focusEditor() {
		editor.current.focus();
	}

	function onChange(editorState) {
		const value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
		setContent(value);
		return editorStateSet(editorState);
	}

	const handleKeyCommand = (command: string) => {
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			onChange(newState);
			return "handled";
		}
		return "not-handled";
	};

	function onTab(e) {
		const maxDepth = 4;
		onChange(RichUtils.onTab(e, editorState, maxDepth));
	}

	function toggleBlockType(blockType) {
		onChange(RichUtils.toggleBlockType(editorState, blockType));
	}

	function toggleInlineStyle(inlineStyle) {
		onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
	}

	// If the user changes block type before entering any text, we can
	// either style the placeholder or hide it. Let's just hide it now.
	let className = "RichEditor-editor";
	var contentState = editorState.getCurrentContent();
	if (!contentState.hasText()) {
		if (contentState.getBlockMap().first().getType() !== "unstyled") {
			className += " RichEditor-hidePlaceholder";
		}
	}

	return (
		<div className="RichEditor-root">
			<BlockStyleControls
				editorState={editorState}
				onToggle={toggleBlockType}
			/>
			<InlineStyleControls
				editorState={editorState}
				onToggle={toggleInlineStyle}
			/>
			<div className={className} onClick={focusEditor}>
				<Editor
					blockStyleFn={getBlockStyle}
					customStyleMap={styleMap}
					editorState={editorState}
					handleKeyCommand={handleKeyCommand}
					onTab={onTab}
					placeholder={placeholder}
					ref={editor}
					onChange={onChange}
					spellCheck={true}
				/>
			</div>
			<style global jsx>{`
				.RichEditor-root {
					background: #fff;
					border: 1px solid #ddd;
					font-family: "Georgia", serif;
					font-size: 14px;
					padding: 15px;
				}

				.RichEditor-editor {
					border-top: 1px solid #ddd;
					cursor: text;
					font-size: 16px;
					margin-top: 10px;
				}

				.RichEditor-editor .public-DraftEditorPlaceholder-root,
				.RichEditor-editor .public-DraftEditor-content {
					margin: 0 -15px -15px;
					padding: 15px;
				}

				.RichEditor-editor .public-DraftEditor-content {
					min-height: 100px;
				}

				.RichEditor-hidePlaceholder .public-DraftEditorPlaceholder-root {
					display: none;
				}

				.RichEditor-editor .RichEditor-blockquote,
				blockquote {
					border-left: 5px solid ${Colors.Primary};
					font-style: italic;
					margin: 16px 0;
					padding: 10px 20px;
				}

				.RichEditor-editor .public-DraftStyleDefault-pre {
					background-color: rgba(0, 0, 0, 0.05);
					font-family: "Inconsolata", "Menlo", "Consolas", monospace;
					font-size: 16px;
					padding: 20px;
				}

				.RichEditor-controls {
					font-family: "Helvetica", sans-serif;
					font-size: 14px;
					margin-bottom: 5px;
					user-select: none;
				}

				.RichEditor-styleButton {
					color: #999;
					cursor: pointer;
					margin-right: 16px;
					padding: 2px 0;
					display: inline-block;
				}

				.RichEditor-activeButton {
					color: #5890ff;
				}
			`}</style>
		</div>
	);
}

// Custom overrides for "code" style.
const styleMap = {
	CODE: {
		backgroundColor: "rgba(0, 0, 0, 0.05)",
		fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
		fontSize: 16,
		padding: 2,
	},
};

function getBlockStyle(block) {
	switch (block.getType()) {
		case "blockquote":
			return "RichEditor-blockquote";
		default:
			return null;
	}
}

// COPYPASTE
// Credits to https://codepen.io/Kiwka/pen/YNYvyG
const StyleButton = (props) => {
	const onToggle = (e) => {
		e.preventDefault();
		props.onToggle(props.style);
	};

	let className = "RichEditor-styleButton";
	if (props.active) {
		className += " RichEditor-activeButton";
	}

	return (
		<span className={className} onMouseDown={onToggle}>
			{props.label}
		</span>
	);
};

const BLOCK_TYPES = [
	{ label: "H1", style: "header-one" },
	{ label: "H2", style: "header-two" },
	{ label: "H3", style: "header-three" },
	{ label: "H4", style: "header-four" },
	{ label: "H5", style: "header-five" },
	{ label: "H6", style: "header-six" },
	{ label: "Blockquote", style: "blockquote" },
	{ label: "UL", style: "unordered-list-item" },
	{ label: "OL", style: "ordered-list-item" },
	// { label: "Code Block", style: "code-block" },
];

const BlockStyleControls = (props) => {
	const { editorState } = props;
	const selection = editorState.getSelection();
	const blockType = editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType();

	return (
		<div className="RichEditor-controls">
			{BLOCK_TYPES.map((type) => (
				<StyleButton
					key={type.label}
					active={type.style === blockType}
					label={type.label}
					onToggle={props.onToggle}
					style={type.style}
				/>
			))}
		</div>
	);
};

var INLINE_STYLES = [
	{ label: "Bold", style: "BOLD" },
	{ label: "Italic", style: "ITALIC" },
	{ label: "Underline", style: "UNDERLINE" },
	{ label: "Monospace", style: "CODE" },
];

const InlineStyleControls = (props) => {
	var currentStyle = props.editorState.getCurrentInlineStyle();
	return (
		<div className="RichEditor-controls">
			{INLINE_STYLES.map((type) => (
				<StyleButton
					key={type.label}
					active={currentStyle.has(type.style)}
					label={type.label}
					onToggle={props.onToggle}
					style={type.style}
				/>
			))}
		</div>
	);
};
