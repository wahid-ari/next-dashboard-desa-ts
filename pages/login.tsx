import { useState, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import useToast from '@utils/useToast';
import Button from '@components/systems/Button';
import Heading from '@components/systems/Heading';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { updateToast, pushToast, dismissToast } = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Prefetch the dashboard page
    Router.prefetch('/');
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    let isError = false;
    if (!form.username) {
      isError = true;
      pushToast({ message: 'Username tidak boleh kosong', isError: true });
    }
    if (!form.password) {
      isError = true;
      pushToast({ message: 'Password tidak boleh kosong', isError: true });
    }

    // jika tidak ada error save data
    if (!isError) {
      const toastId = pushToast({
        message: 'Login Admin...',
        isLoading: true,
      });
      try {
        updateToast({
          toastId,
          message: 'Berhasil Login Admin',
          isError: false,
        });
        Router.replace('/');
      } catch (error) {
        updateToast({
          toastId,
          message: 'Gagal login, periksa Username dan Password !',
          isError: true,
        });
        updateToast({
          toastId,
          message: error.response.data.message,
          isError: true,
        });
        console.error(error);
      }
    }
  }

  return (
    <div className='text-sm font-medium dark:bg-white'>
      <Head>
        <title>Login Admin | Desa Digital</title>
      </Head>

      <div className='min-h-screen w-screen sm:grid' style={{ gridTemplateColumns: 'auto 1fr' }}>
        <div className='banner flex flex-col justify-between gap-2 p-8 sm:hidden'>
          <div>
            <h1 className='text-4xl font-bold text-white'>Desa Digital</h1>
          </div>
          <p className='font-bold text-white'>2022</p>
        </div>
        <div className='w-full px-8 py-12 md:px-16'>
          <div className='w-full sm:max-w-md'>
            <Heading h1 className='mb-6 font-semibold !text-neutral-800'>
              Login Admin
            </Heading>
            <div className='mb-5'>
              <label className='block text-sm text-gray-800' htmlFor='username'>
                Username
              </label>
              <input
                type='text'
                name='username'
                placeholder='Username'
                value={form.username}
                onChange={handleChange}
                className='mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-[0.6rem] text-sm font-medium outline-none ring-gray-300 transition-all focus:border-sky-500 focus:ring-1 focus:ring-sky-500 dark:text-neutral-800'
                autoComplete='off'
                required
              />
            </div>
            <div className='mb-5'>
              <label className='block text-sm text-gray-800' htmlFor='password'>
                Password
              </label>
              <div className='relative mb-4 flex items-center'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  placeholder='Password'
                  value={form.password}
                  onChange={handleChange}
                  className='mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-[0.6rem] text-sm font-medium outline-none ring-gray-300 transition-all focus:border-sky-500 focus:ring-1 focus:ring-sky-500 dark:text-neutral-800'
                  autoComplete='off'
                  required
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-0 z-10 mr-0.5 mt-2 rounded-md p-1.5 backdrop-blur-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500'
                >
                  {showPassword ? (
                    <EyeIcon className='h-5 w-5 text-gray-600' />
                  ) : (
                    <EyeOffIcon className='h-5 w-5 text-gray-600' />
                  )}
                </button>
              </div>
            </div>
            <Button onClick={handleLogin} className='w-full'>
              Login Admin
            </Button>
          </div>
        </div>
        <div className='banner hidden flex-col justify-between gap-2 px-8 py-12 sm:flex'>
          <div>
            <h1 className='font-bold text-white sm:text-5xl md:text-6xl'>Desa Digital</h1>
            <br />
            <p className='text-white'>
              Lorem aute ad laborum consequat qui mollit minim. Ullamco in incididunt et minim cupidatat ullamco dolore.
            </p>
          </div>
          <p className='font-bold text-white'>2022</p>
        </div>
      </div>
    </div>
  );
}
