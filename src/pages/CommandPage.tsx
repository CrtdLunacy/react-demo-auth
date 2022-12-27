import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card';
import ExitIcon from '../icons/ExitIcon'
import { useDispatch } from 'react-redux'
import { remove } from '../slices/tokenSlice'

export type ExternalData = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

function CommandPage() {
const [data, setData] = useState<ExternalData[]>([]);
const [pageLoaded, setPageLoaded] = useState(2);
const dispatch = useDispatch();

const handleExit = () => {
  dispatch(remove());
}

const handleLoadData = () => {
  axios.get(`https://reqres.in/api/users?page=${pageLoaded}`)
  .then(function (response) {
    setData([...data, ...response.data.data]);
    setPageLoaded(prev => prev + 1)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

useEffect(() => {
  axios.get('https://reqres.in/api/users')
  .then(function (response) {
    setData([...data, ...response.data.data])
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}, [])

  return (
    <div className='flex flex-col'>
      <div className='bg-[#512689]'>
        <div className='text-white flex flex-col w-5/6 mx-auto items-center pt-[40px] pb-[64px]'>
          <Link
          to='/'
          onClick={handleExit}
          className='border-[1px] border-white rounded-[8px] px-[16px] py-[8px] self-end hidden md:inline-flex'
          >Выход</Link>

          <Link
          to='/'
          onClick={handleExit}
          className='px-[16px] py-[8px] self-end md:hidden'
          ><ExitIcon /></Link>


          <h3 className='mt-5 md:mt-0 text-[36px] md:text-[64px]'>Наша команда</h3>

          <p className='md:w-[840px] text-center'>
          Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.
          </p>
        </div>
      </div>

      <div className='w-5/6 mx-auto grid grid-cols-1 md:grid-cols-4 gap-5 py-[48px]'>
        {data?.map(item => (
          <Card
            key={item.id}
            img={item.avatar}
            name={item.first_name}
            surname={item.last_name}
            id={item.id}
          />
        ))}
      </div>

      <button
      className="relative self-center after:content-[''] after:h-3 after:w-3 after:block after:border-t-2 after:border-r-2 after:border-black after:rotate-[135deg] after:absolute after:top-3 after:right-5 px-[16px] py-[9px] pr-[40px] border-[1px] border-black rounded-[8px] mb-[32px]"
      onClick={handleLoadData}
      >
        Показать еще
      </button>
    </div>
  )
}

export default CommandPage
