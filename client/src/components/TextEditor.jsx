import React, { useEffect, useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { convertFromHTML, convertToHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../css/textEditor.css"

const TextEditor = ({ data, setHTML, onBlur }) => {
    const [editorState, setEditorState] = useState(
        data
            ?
            () => EditorState.createWithContent(convertFromHTML({
                htmlToStyle: (nodeName, node, currentStyle) => {
                    if (node.style.verticalAlign === 'super') {
                        return currentStyle.add("SUPERSCRIPT");
                    }

                    if (node.style.verticalAlign === 'sub') {
                        return currentStyle.add("SUBSCRIPT");
                    }

                    if (node.style.color) {
                        return currentStyle.add('redBackground');
                    }

                    return currentStyle;
                }
            })(data))
            :
            () => EditorState.createEmpty()
    );

    useEffect(() => {
        let html = convertToHTML({
            styleToHTML: (style) => {
                if (style === 'SUBSCRIPT') {
                    return <span style={{ verticalAlign: 'sub' }} />;
                }
                if (style === 'SUPERSCRIPT') {
                    return <span style={{ verticalAlign: 'super' }} />;
                }
                if (style === 'STRIKETHROUGH') {
                    return <span style={{ textDecoration: 'line-through' }} />;
                }
                if (style.split('-')[0] === 'color') {
                    return <span style={{ color: style.split('-')[1] }} />;
                }
                if (style.split('-')[0] === 'bgcolor') {
                    return <span style={{ backgroundColor: style.split('-')[1] }} />;
                }
                if (style.split('-')[0] === 'fontfamily') {
                    return <span style={{ fontFamily: style.split('-')[1] }} />;
                }
            },
            blockToHTML: (block) => {
                if (block.type === 'code') {
                    return <pre />;
                }
            },
        })(editorState.getCurrentContent());
        setHTML(html)
    }, [editorState, setHTML]);

    return (
        <>
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                onBlur={() => onBlur(true)}
                placeholder="?????????????? ???????????????? ????????????????"
                toolbar={{
                    options: ['inline', 'blockType', 'list', 'emoji', 'remove', 'history'],
                    blockType: {
                        inDropdown: true,
                        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
                        className: 'blockType',
                        title: "?????? ??????????"
                    },
                    inline: {
                        bold: { title: '????????????' },
                        italic: { title: '????????????' },
                        underline: { title: '????????????????????????' },
                        strikethrough: { title: '??????????????????????' },
                        superscript: { title: '??????????????????????' },
                        subscript: { title: '??????????????????????' },
                        monospace: { title: '????????????????????????' }
                    },
                    list: {
                        unordered: { title: '??????????????' },
                        ordered: { title: '??????????????????' },
                        indent: { title: '????????????' },
                        outdent: { title: '????????????' },
                    },
                    emoji: {
                        title: "????????????"
                    },
                    remove: {
                        title: "????????????"
                    },
                    history: {
                        undo: { title: '??????????' },
                        redo: { title: '????????????' },
                    }
                }}
                editorClassName="editor border rounded border-top-0"
            />
        </>
    );
};

export default TextEditor;