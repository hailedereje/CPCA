import { useState } from "react";
import Fuse from "fuse.js";

export const InputList = () => {

    const [content, setContent] = useState('');
    const [contents, setContents] = useState([]);
    const [toggle,setToggle] = useState(false)
    const [filter, setFilter] = useState('');
    const [filteredCourses, setFilteredCourses] = useState(courseList);

    const fuse = new Fuse(courseList,{
        keys:['name'],
        includeScore:true,
        findAllMatches:true,
        threshold: 0.6
    })

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);
        const result = fuse.search(value);
        const filtered = result.map(item => item.item);
        setFilteredCourses(filtered);
      };


    const handleChange = (e) => {
        setContent(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(filteredCourses)
        const result = filteredCourses[0] ?? null
        if(!result) return
        setContents(prev => [...prev, result.name]);
        setContent(''); 
    };

    const deleteContent = (idx) => {
        setContents(prev => {
            const newContents = prev.filter((_,index) => index !== idx)
            return newContents
        })
    }

    console.log(filteredCourses)
    return (
        <form onSubmit={onSubmit} className="flex gap-2 items-end">
            <div className="relative w-full">
               <div className="w-full flex gap-1 items-center border p-1 flex-wrap">
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
                    value={content}
                    onChange={(e) =>{ 
                        handleChange(e)
                        handleFilterChange(e)
                    }}
                    className="text-xs p-2 w-full rounded-md focus:outline-none appearance-none"
                    onFocus={() => setToggle(true)}
                    onBlur={() => setToggle(false)}
                    
                />
                
                </div> 
                <div className={`flex flex-col max-h-32 overflow-scroll editor p-1 gap-y-1 items-center mt-1 w-full shadow-md ${toggle ? "":"hidden"}`}>

                { filteredCourses.length !== 0 ?
                    filteredCourses.map((course,idx) => (
                       <button  
                            key={course.id} 
                            type="submit"
                            className={`flex p-2 hover:bg-blue-400 w-full rounded-sm ${idx===0 ? "bg-blue-400":""}`}
                            >
                            <span className="text-sm">{course.name}</span>
                    </button> 
                    )) : <div className="">no content</div>
                }
                </div>
            </div>
        </form>
    );
};

const courseList = [
    { id: "course1", name: "Advanced Programming Course" },
    { id: "course2", name: "Introductory Web Development Course" },
    { id: "course3", name: "Intermediate Data Science Course" },
    { id: "course4", name: "Fundamental Machine Learning Course" },
    { id: "course5", name: "Practical Cybersecurity Course" },
    { id: "course6", name: "Theoretical Database Management Course" },
    { id: "course7", name: "Applied Programming Course" },
    { id: "course8", name: "Advanced Web Development Course" },
    { id: "course9", name: "Introductory Data Science Course" },
    { id: "course10", name: "Intermediate Machine Learning Course" }
  ];