import { Link } from "react-router-dom"

export const EditCourseError = () => {
    return (
        <main className='grid min-h-[100vh] place-items-center px-8'>
                <div className='text-center'>
                  <p className='text-9xl font-semibold text-primary'>403</p>
                  <h1 className='mt-4 text-3xl font-bold tracking-tight sm:text-5xl'>
                    action not allowed
                  </h1>
                  <p className='mt-6 text-lg leading-7 capitalize'>
                    Sorry, no course is selected to edit here
                  </p>
                  <div className='mt-10 flex items-center justify-center p-3 rounded-md bg-blue-500'>
                    <Link to='/' className='text-white'>
                      go back home
                    </Link>
                  </div>
                  <div className="flex items-center justify-end p-2">
                    <Link to="/createCourse" className="font-medium font-sm text-blue-500">
                        you want to create course ?
                    </Link>
                  </div>
                </div>
              </main>
    )
}