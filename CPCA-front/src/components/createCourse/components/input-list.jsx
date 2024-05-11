import { useEffect, useRef, useState } from "react";
import Fuse from "fuse.js";

export const InputList = ({ items }) => {
    const [content, setContent] = useState('');
    const [contents, setContents] = useState([]);
    const [toggle, setToggle] = useState(false)
    const [filteredCourses, setFilteredCourses] = useState(items);

    const fuse = new Fuse(items, {
        keys: ['name'],
        includeScore: true,
        findAllMatches: true,
        threshold: 0.6
    })

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setContent(value);
        const result = fuse.search(content);
        const filtered = result.map(item => item.item);
        setFilteredCourses(filtered);
        setToggle(!!value); 
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const result = filteredCourses[0] ?? null
        if (!result) return
        const isDuplicate = !!contents.find(item => item === result.name)
        if(!isDuplicate) {
            setContents(prev => [...prev, result.name]);
            setContent('');
            setToggle(false); 
        }
        
    };

    const addContent = (newItem) => 
        {
            const isDuplicate = !!contents.find(item => item === newItem)
            if(!isDuplicate)
                {
                    setContents(prev => [...prev, newItem])
                    setContent("")
                    inputRef.current.focus() 
                }
            
        }
    
    const deleteContent = (idx) => {
        setContents(prev => {
            const newContents = prev.filter((_, index) => index !== idx)
            return newContents
        })
    }

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
                        {contents.map((cont, idx) => (
                            <div key={idx} className="flex gap-1 bg-green-300 p-2 rounded-md">
                                <span className="text-xs">{cont}</span>
                                <button type="button" onClick={() => deleteContent(idx)}>
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
                        value={content}
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
                                onClick={() => addContent(course.name)}
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



