import {Outlet} from 'react-router-dom'

const AuthLayaout = () => {
  return (
    <>
        <main className='container mx-auto md:grid md:grid-cols-2 mt-8 gap-20 p-5 items-center'>
          <Outlet />
        </main>
    </>
  )
}

export default AuthLayaout;