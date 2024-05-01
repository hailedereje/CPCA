import { createSlice, nanoid } from "@reduxjs/toolkit";

const ITEM_NAME = 'topic_content';
const topics = [
    { id:nanoid(),order:0,name:"text", content:"",show:false }
]

const getTopicFromLocalStorage = () => {
    let topic = JSON.parse(localStorage.getItem(ITEM_NAME));
    topic = topic ?? topics;
    localStorage.setItem(ITEM_NAME, JSON.stringify(topic));
    return topic;
}

const initialState = {
    topics: getTopicFromLocalStorage()
}
    
export const topicSlice = createSlice({
    name: "topic",
    initialState,
    reducers: {
        addTopic: (state, action) => {
            const {idx,topic} = action.payload;
            state.topics.splice(idx+1,0,topic);
            localStorage.setItem(ITEM_NAME, JSON.stringify(state.topics));
        },
        removeTopic: (state, action) => {
            state.topics = state.topics.length === 1 
                ? topics 
                : state.topics.filter(topic => topic.id !== action.payload);
            localStorage.setItem(ITEM_NAME, JSON.stringify(state.topics));
        },
        updateTopic: (state, action) => {
            const {id, content} = action.payload;
            const topic = state.topics.find(topic => topic.id === id);
            if(topic){
                topic.content = content;
                localStorage.setItem(ITEM_NAME, JSON.stringify(state.topics.map(topic => topic.id === id ? {...topic,show:false} : topic)));
            }

        },
        addImage: (state,action) => {
            const {image,idx} = action.payload
            state.topics.splice(idx+1,0,{ id:nanoid(),order:0,name:"image", content:image,show:false });
            
        },
        toggleShow: (state, action) => {
            const {id} = action.payload;
            const topic = state.topics.find(topic => topic.id === id);
            if(topic){
                topic.show = !topic.show;
            }
        },
        
    }
})

export const { addTopic, removeTopic, updateTopic, toggleShow ,addImage} = topicSlice.actions;
export default topicSlice.reducer;