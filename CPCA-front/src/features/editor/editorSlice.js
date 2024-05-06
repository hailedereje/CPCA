import { LANGUAGES, SNIPTS } from "@/assets/constants";
import { createSlice } from "@reduxjs/toolkit";
import language from "react-syntax-highlighter/dist/esm/languages/hljs/1c";

const initialState = {
    languages: LANGUAGES,
    snipts:SNIPTS,
    defaultLanguage: LANGUAGES.javascript.name,
    defaultSnipt: SNIPTS.javascript,
    editorContent: {
        language:LANGUAGES.javascript.name,
        code:SNIPTS.javascript
    }
}
export const EditorSlice = createSlice({
    name:"editor",
    initialState,
    reducers: {
        setCode: (state,action) => {
            const { code } = action.payload;
            state.editorContent.code = code
        },
        getCode: (state,action) => {
            const {language} = action.payload;
            state.editorContent = {language,code:state.snipts[language]}

        }
    }
})

export const {setCode,getCode }  =  EditorSlice.actions
export default EditorSlice.reducer