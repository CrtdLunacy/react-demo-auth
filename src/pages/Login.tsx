import axios from 'axios';
import{ ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import HiddenIcon from '../icons/HiddenIcon';
import { useDispatch } from 'react-redux'
import { add } from '../slices/tokenSlice'



function Login() {
  const [loginData, setLoginData] = useState({login: '', pass: ''});
  const [error, setError] = useState('');
  const [type, setType] = useState('password');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({...loginData, login: e.target.value})
  }
  const handleChangePass = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({...loginData, pass: e.target.value})
  }

  const handleType = () => {
    (type === 'password') ? setType('text') : setType('password')
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    axios.post('https://reqres.in/api/login', {
      email: loginData.login,
      password: loginData.pass,
    })
    .then(function (response) {
      dispatch(add(response.data.token))
      navigate('/command');
    })
    .catch(function (error) {
      if(error.response.data.error === 'user not found') setError('Пользователь не найден')
    });
  }

  return (
    <div className='h-screen flex items-center'>
      <div className='w-[500px] mx-auto shadow-lg rounded-2xl flex flex-col'>
      <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-5 p-5"
      >
        <h2 className='text-xl'>
          Вход
        </h2>

        <label className='flex flex-col'>
          Электронная почта
          <input required className='bg-[#F8F8F8] mt-3 p-4 rounded-[8px]' placeholder='example@reqres.in' onChange={handleChangeLogin} type="email" pattern='.+@reqres\.in' />
        </label>

        <label className='flex flex-col relative'>
          Пароль
          <input required className='bg-[#F8F8F8] mt-3 p-4 rounded-[8px]' placeholder='******' onChange={handleChangePass} type={type} />
          <button onClick={handleType} className={'absolute top-[55px] right-5 ' + ((type === 'text') ? 'opacity-30' : 'opacity-100')}>
            <HiddenIcon />
          </button>
        </label>

        <button className='text-white bg-[#512689] w-full py-[13px] rounded-[8px]'>Войти</button>
      </form>
      <Link to='/registration' className='text-[#512689] self-center pb-5'>Зарегистрироваться</Link>
      {error ? (
        <span className='text-lg text-red-400 self-center'>{error}</span>
      ) : null}
     </div>
    </div>
  )
}

export default Login
