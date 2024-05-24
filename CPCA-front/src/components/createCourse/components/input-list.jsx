import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Fuse from "fuse.js";
import { ActionTypes } from "../action.Types";
import { useDispatch } from "react-redux";
import { setPrerequistes, setTags } from "@/features/course/createCourse";
import { useDebounce } from "@/hooks/useDebounce";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useQueryClient } from "@tanstack/react-query";

export const InputList = ({ items, type, courseId }) => {

    const client = useQueryClient();
    const course = client.getQueryData(['course', courseId]).data.course;
    const dispatch = useDispatch();
    
    const { prerequisites,tags } = course
    const [contents, setContents] = useState(type === ActionTypes.ADD_PREREQUISITES ? prerequisites : tags);
    const [content, setContent] = useState("");

    const [toggle, setToggle] = useState(false);
    const [filteredCourses, setFilteredCourses] = useState(items);

    const fuse = useMemo(() => new Fuse(items, {
        keys: ['title'],
        includeScore: true,
        findAllMatches: true,
        threshold: 0.6
    }), [items]);

    const debouncedContent = useDebounce(content, 300);

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setContent(value);
    };

    useEffect(() => {
        if (debouncedContent) {
            const result = fuse.search(debouncedContent);
            const filtered = result.map(item => item.item);
            setFilteredCourses(filtered);
            setToggle(true);
        } else {
            setFilteredCourses(items);
            setToggle(false);
        }
    }, [debouncedContent, fuse, items]);

    const action = useCallback((value) => {
        setContents(prevContents => {
            const newContents = [...prevContents, value];
            if (type === ActionTypes.ADD_PREREQUISITES) {
                dispatch(setPrerequistes({ prerequisites: newContents }));
            } else if (type === ActionTypes.ADD_TAGS) {
                dispatch(setTags({ tags: newContents }));
            }
            return newContents;
        });
    }, [dispatch, type]);

    const onSubmit = (e) => {
        e.preventDefault();
        const result = filteredCourses[0] ?? null;
        if (!result) return;
        const isDuplicate = !!contents.find(item => item.id === result.id);
        if (!isDuplicate) {
            setToggle(false);
            action(result);
            setContent('');
        }
    };

    const addContent = (newItem) => {
        const isDuplicate = !!contents.find(item => item.id === newItem.id);
        if (!isDuplicate) {
            action(newItem);
            setContent('');
            inputRef.current.focus();
        }
    };

    const deleteContent = (id) => {
        setContents(prevContents => {
            const newContents = prevContents.filter(content => content.id !== id);
            if (type === ActionTypes.ADD_PREREQUISITES) {
                dispatch(setPrerequistes({ prerequisites: newContents }));
            } else if (type === ActionTypes.ADD_TAGS) {
                dispatch(setTags({ tags: newContents }));
            }
            return newContents;
        });
    };

    const formRef = useRef(null);
    const inputRef = useRef(null);

    useClickOutside(formRef, () => setToggle(false));

    return (
        <form onSubmit={onSubmit} className="flex gap-2 items-end dark:bg-gray-600 z-10 dark:text-black" ref={formRef}>
            <div className="relative w-full">
                <div className="w-full flex gap-1 items-center border border-blue-300 p-1 flex-wrap max-h-32 overflow-auto editor">
                    <div className="flex items-center gap-2 flex-wrap">
                        {contents.length > 0 && contents.map((cont, idx) => (
                            <div key={idx} className="flex gap-1 bg-green-300 p-2 rounded-md">
                                <span className="text-xs text-left">{cont.title}</span>
                                <button type="button" onClick={() => deleteContent(cont.id)}>
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
                        className="text-xs p-2 w-full rounded-md focus:outline-none appearance-none dark:text-white dark:bg-transparent dark:placeholder:text-white"
                        ref={inputRef}
                    />
                </div>
                <div className={`absolute bg-white dark:bg-gray-500 text-white z-30 top-full left-0 mt-2 flex flex-col max-h-32 overflow-auto editor p-1 gap-y-1 items-center w-full shadow-md ${toggle && filteredCourses.length ? "" : "hidden"}`} hidden={filteredCourses.length === 0}>
                    {filteredCourses.map((course, idx) => (
                        <button
                            key={course.id}
                            type="button"
                            onClick={() => addContent(course)}
                            className="flex p-2 hover:bg-blue-200 dark:hover:bg-gray-600 w-full rounded-sm"
                        >
                            <span className="text-sm text-left">{course.title}</span>
                        </button>
                    ))}
                </div>
            </div>
        </form>
    );
};
