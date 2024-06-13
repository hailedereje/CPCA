import { useRouteError, Link } from 'react-router-dom';

const ErrorPage = () => {
  let errorMessage = '';
  const error = useRouteError();
  switch (error.status) {
    case 404:
      errorMessage = 'Oops! Page not found.';
      break;
    case 403:
      errorMessage = 'You are not authorized to access this page.';
      break;
    case 500:
      errorMessage = 'Oops! Something went wrong on the server.';
      break;
    default:
      errorMessage = 'Oops! An error occurred.';
      break;
  }

  if(error.status === 500 ) {
    return (
      <div className="flex flex-col items-center justify-center h</svg>-full p-4 text-center">
        <p className="text-2xl font-bold dark:text-white mb-4">Failed to Load the content</p>
        <p className="text-lg text-gray-600 mb-4">Check your connection and try again.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    )
  }
    return (
      <main className='grid min-h-[100vh] place-items-center px-8'>
        <div className='text-center'>
          <p className='text-9xl font-semibold text-primary'>{error.status}</p>
          <h1 className='mt-4 text-3xl font-bold tracking-tight sm:text-5xl'>
            {errorMessage}
          </h1>
          <div className='mt-10 flex items-center justify-center p-3 rounded-md bg-blue-500'>
          <Link to='/' className='text-white'>
              go back home
            </Link>
          </div>
        </div>
      </main>
    );
  }

export default ErrorPage;