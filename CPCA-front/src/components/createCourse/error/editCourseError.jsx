import { Link } from "react-router-dom"

export const EditCourseError = ({message,status}) => {
    return (
      <main className='grid min-h-[100vh] place-items-center px-8'>
      <div className='text-center'>
        <p className='text-9xl font-semibold text-primary'>{status}</p>
        <h1 className='mt-4 text-3xl font-bold tracking-tight sm:text-5xl'>
        {message}
        </h1>
        <div className='mt-10 flex items-center justify-center p-3 rounded-md bg-blue-500'>
          <Link to='/' className='text-white'>
            go back home
          </Link>
        </div>
      </div>
    </main>
    )
}

export const QuizError = ({status,message}) => {
  return (
      <main className='grid min-h-[100vh] place-items-center px-8'>
              <div className='text-center'>
                <p className='text-9xl font-semibold text-primary'>{status}</p>
                <h1 className='mt-4 text-3xl font-bold tracking-tight sm:text-5xl'>
                {message}
                </h1>
                <div className='mt-10 flex items-center justify-center p-3 rounded-md bg-blue-500'>
                  <Link to='/' className='text-white'>
                    go back home
                  </Link>
                </div>
              </div>
            </main>
  )
}