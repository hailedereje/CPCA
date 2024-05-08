import axios from "axios"
import { LANGUAGE_VERSIONS } from "./assets/constants"

export const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston"
})
export const excuteCode = async ({language,code,version}) => {
    const response = await API.post("/execute",{
        "language": language,
        "version": version,
        "files": [{
            "content": code
        }]
    })
    return response.data
}

const languageList = [
    "typescript",
    "javascript",
    "c",
    "c++",
    "java",
    "php",
    "python",
    "csharp"
]
const list = new Set(languageList)

export const getLanguages = async() => {
    const res = await API.get("/runtimes")
    const data = res.data.filter(d => list.has(d.language))
    const final = data.reduce((acc, curr) => {
        acc[curr.language] = curr;
        return acc;
    }, {});
    return final 
   }