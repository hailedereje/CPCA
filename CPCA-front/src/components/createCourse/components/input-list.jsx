import { useEffect, useRef, useState } from "react";
import Fuse from "fuse.js";
import { ActionTypes } from "../action.Types";
import { useDispatch, useSelector } from "react-redux";
import { addPrerequistes, addTags, deletePrerequisite, deleteTag } from "@/features/course/createCourse";

export const InputList = ({ items,type }) => {
    const {prerequisites,tags} = useSelector(x => x.createCourseState)
    const dispatch = useDispatch()
    const [content, setContent] = useState();
    const contents= type === ActionTypes.ADD_PREREQUISITES ? prerequisites : tags;
    const [toggle, setToggle] = useState(false)
    const [filteredCourses, setFilteredCourses] = useState(items);

    const fuse = new Fuse(items, {
        keys: ['name'],
        includeScore: true,
        findAllMatches: true,
        threshold: 0.6
    })
    // console.log(ActionTypes.ADD_PREREQUISITES ? prerequisites : tags)
    const handleFilterChange = (e) => {
        const value = e.target.value;
        setContent(value);
        const result = fuse.search(content);
        const filtered = result.map(item => item.item);
        setFilteredCourses(filtered);
        setToggle(!!value); 
    };

    const action = (value) => {
        switch (type) {
            case ActionTypes.ADD_PREREQUISITES: 
                dispatch(addPrerequistes({prerequisite:value}))
                break;
            case ActionTypes.ADD_TAGS:
                dispatch(addTags({tag: value}))
                break;
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const result = filteredCourses[0] ?? null
        if (!result) return
        const isDuplicate = !!contents.find(item => item.id === result.id)
        if(!isDuplicate) {
            // setContents(prev => [...prev, result]);
            setToggle(false);
            action(result)
            setContent('')  
        }   
        
    };

    const addContent = (newItem) => 
        {
            const isDuplicate = !!contents.find(item => item.id === newItem.id)
            if(!isDuplicate)
                {
                    // setContents(prev => [...prev, newItem])
                    action(newItem)
                    setContent('')
                    inputRef.current.focus() 
                }
            
        }
    
    const deleteContent = ({id}) => {
        switch(type) {
            case ActionTypes.ADD_PREREQUISITES:
              dispatch(deletePrerequisite({id})) 
              break;
            case ActionTypes.ADD_TAGS:
                dispatch(deleteTag({id})) 
                break
        }
        
    }
    console.log(tags)
    const formRef = useRef(null);
    const inputRef = useRef(null);

    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            setToggle(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [content]);

    return (
        <form onSubmit={onSubmit} className="flex gap-2 items-end" ref={formRef}>
            <div className="relative w-full">
                <div className="w-full flex gap-1 items-center border border-blue-300 p-1 flex-wrap max-h-32 overflow-scroll editor">
                    <div className="flex items-center gap-2 flex-wrap">
                        {contents.map((cont,idx) => (
                            <div key={idx} className="flex gap-1 bg-green-300 p-2 rounded-md">
                                <span className="text-xs">{cont.name}</span>
                                <button type="button" onClick={() => deleteContent({id:cont.id})}>
                                    <svg className="text-gray-500" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="type in here"
                        value={content?.name}
                        onChange={handleFilterChange}
                        onFocus={() => setToggle(true)}
                        className="text-xs p-2 w-full rounded-md focus:outline-none appearance-none"
                        ref={inputRef}
                    />
                </div>
                <div className={`absolute bg-white z-30 top-full left-0 mt-2 flex flex-col max-h-32 overflow-scroll editor p-1 gap-y-1 items-center w-full border border-gray-300 shadow-md ${toggle && filteredCourses.length !== 0 ? "" : "hidden"}`} >
                    {
                        filteredCourses.map((course, idx) => (
                            <button
                                key={course.id}
                                type="button"
                                onClick={() => addContent(course)}
                                className={`flex p-2 hover:bg-blue-200 w-full rounded-sm`}
                            >
                                <span className="text-sm">{course.name}</span>
                            </button>
                        ))
                    }
                </div>
            </div>
        </form>
    );
};



