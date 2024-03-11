import React from 'react'
import { FormInput } from '../components'
import { SubmitBtn} from '../components'
import { Form, Link } from 'react-router-dom'

function Login() {

    const loginAsGuestUser = () => {

    }

    const handleSumbit = (e) => {
      e.preventDefault();
      console.log('login clicked')
    }
  
    return (
        <section className='h-screen grid place-items-center'>
          <form
            onSubmit={handleSumbit}
            className='card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
          >
            <h4 className='text-center text-3xl font-bold'>Login</h4>
            <FormInput type='email' label='email' name='identifier' />
            <FormInput type='password' label='password' name='password' />
            <div className='mt-4'>
              <SubmitBtn text='login' />
            </div>
            <button
              type='button'
              className='btn btn-secondary btn-block'
              onClick={loginAsGuestUser}
            >
              guest user
            </button>
            <p className='text-center'>
              Not a member yet?{' '}
              <Link
                to='/register'
                className='ml-2 link link-hover link-primary capitalize'
              >
                register
              </Link>
            </p>
          </form>
        </section>
      );
}

export default Login
