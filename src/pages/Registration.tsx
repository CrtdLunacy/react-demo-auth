import axios from 'axios';
import{ ChangeEvent, FormEvent, useState } from 'react'
import HiddenIcon from '../icons/HiddenIcon';
import { useDispatch } from 'react-redux'
import { add } from '../slices/tokenSlice'
import { useNavigate } from 'react-router-dom';


function Registration() {
  const [loginData, setLoginData] = useState({login: '', pass: '', secondPass: ''})
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

  const handleChangeSecondPass = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({...loginData, secondPass: e.target.value})
  }

  const handleType = () => {
    (type === 'password') ? setType('text') : setType('password')
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(loginData.pass !== loginData.secondPass) {
      setError('Несовпадают пароли')
      throw new Error('Несовпадают пароли')
    }

    console.log(loginData.login, loginData.pass)

    axios.post('https://reqres.in/api/register', {
      email: loginData.login,
      password: loginData.pass,
    })
    .then(function (response) {
      dispatch(add(response.data.data.token))
      navigate('/command');
    })
    .catch(function (error) {
      console.log(error.status);
      if (error.status === undefined) {
        setError('Произошла неизвестная ошибка - попробуйте пройти регистрацию позже');
      }
      if(error.response.data.error === 'Note: Only defined users succeed registration') {
        setError('Невозможно зарегистировать пользователя с такими данными');
      }
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
            Регистрация
          </h2>

          <label className='flex flex-col'>
            Имя
            <input id='name' className='bg-[#F8F8F8] mt-3 p-4 rounded-[8px]' placeholder='Артур' onChange={handleChangeLogin} type="text" />
          </label>

          <label className='flex flex-col'>
            Электронная почта
            <input className='bg-[#F8F8F8] mt-3 p-4 rounded-[8px]' placeholder='example@mail.ru' onChange={handleChangeLogin} type="email" pattern='.+@reqres\.in' />
          </label>

          <label className='flex flex-col relative'>
            Пароль
            <input className='bg-[#F8F8F8] mt-3 p-4 rounded-[8px]' placeholder='******' onChange={handleChangePass} type={type} />
            <button onClick={handleType} className={'absolute top-[55px] right-5 ' + ((type === 'text') ? 'opacity-30' : 'opacity-100')}>
              <HiddenIcon />
            </button>
          </label>

          <label className='flex flex-col relative'>
            Подтвердите пароль
            <input className='bg-[#F8F8F8] mt-3 p-4 rounded-[8px]' placeholder='******' onChange={handleChangeSecondPass} type={type} />
            <button onClick={handleType} className={'absolute top-[55px] right-5 ' + ((type === 'text') ? 'opacity-30' : 'opacity-100')}>
              <HiddenIcon />
            </button>
          </label>

          <button className='text-white bg-[#512689] w-full py-[13px] rounded-[8px]'>Зарегистрироваться</button>
        </form>
        {error ? (
          <span className='text-lg text-red-400 self-center w-5/6 mx-auto text-center'>{error}</span>
        ) : null}
      </div>
    </div>
  )
}

export default Registration
