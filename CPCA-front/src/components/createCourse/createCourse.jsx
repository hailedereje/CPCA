import React, { useState } from 'react';
import { InputList } from './components/input-list';

export const CreateCourse = () => {
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        author: '',
        duration: '',
        level: '',
        prerequisites: '',
        tags: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Course data:', courseData);
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-lg overflow-hidden shadow-md p-6">
            <h2 className="text-4xl font-semibold mb-6">Create a New Course</h2>
            <InputList/>
            {false &&<form onSubmit={handleSubmit} className="space-y-4">
                <div className="w-full flex items-center justify-between gap-3">
                    <div className='basis-1/2'>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={courseData.title}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                            required
                        />
                    </div>
                    <div className='basis-1/2'>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
                        <input
                            type="text"
                            name="author"
                            id="author"
                            value={courseData.author}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea
                        name="description"
                        id="description"
                        value={courseData.description}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                        required
                    ></textarea>
                </div>
                <div className="w-full flex items-center justify-between gap-3">
                    <div className='basis-1/2'>
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration:</label>
                        <input
                            type="text"
                            name="duration"
                            id="duration"
                            value={courseData.duration}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                            required
                        />
                    </div>
                    <div className='basis-1/2'>
                        <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level:</label>
                        <select
                            name="level"
                            id="level"
                            value={courseData.level}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                            required
                        >
                            <option value="">Select Level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="prerequisites" className="block text-sm font-medium text-gray-700">Prerequisites:</label>
                    <input
                        type="text"
                        name="prerequisites"
                        id="prerequisites"
                        value={courseData.prerequisites}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                    />
                </div>
                <div className='relative'>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags:</label>
                    <input
                        type="text"
                        name="tags"
                        id="tags"
                        value={courseData.tags}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Create Course
                </button>
            </form>}
        </div>
    );
};

