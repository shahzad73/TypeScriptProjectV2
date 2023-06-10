import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


export default function CustomTextEditor(props: { defaultHTML: any; onChange: (arg0: any) => void; height: any; }) {

    const hashConfig = {
      trigger: '#',
      separator: ' ',
    }

    const getInitialState = (defaultValue: any) => {
      if (defaultValue) {
        const blocksFromHtml = htmlToDraft(defaultValue);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        return EditorState.createWithContent(contentState);
      } else {
        return EditorState.createEmpty();
      }
    };

    const [editorState, setEditorState] = useState(
        () => getInitialState(props.defaultHTML)
    );

    const handleEditorChange = (state: any) => {
        setEditorState(state);
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const markup = draftToHtml(
          rawContentState, 
          hashConfig, 
          false
        );
        props.onChange(  DOMPurify.sanitize(markup)  );
    }
    
    React.useEffect(() => {
        return () => {
            //alert("Bye");
        };
    }, []);

    return (  
      <div>
            <Editor
                wrapperClassName="wrapper"
                editorClassName="editor"
                toolbarClassName="toolbar"
                editorState={editorState}                                                
                onEditorStateChange={handleEditorChange}
                // editorStyle={{background-color: "white", border: "0px solid", height: props.height, padding: "10px"}}
            /> 
      </div>
    );

}
