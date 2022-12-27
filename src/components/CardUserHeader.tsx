import { Link } from 'react-router-dom'
import ExitIcon from '../icons/ExitIcon'
import { UserProps } from './Card'
import { useDispatch } from 'react-redux'
import { remove } from '../slices/tokenSlice'


function CardUserHeader({img, name, surname}: UserProps) {
  const dispatch = useDispatch();

  const handleExit = () => {
    dispatch(remove());
  }

  return (
    <div className='bg-[#512689]'>
      <div className='flex justify-between w-5/6 mx-auto text-white py-[23px] md:py-[39px]'>
        <Link
          to='/command'
          className='border-[1px] border-white rounded-[8px] px-[16px] py-[8px] self-start hidden md:inline-flex'
        >Назад</Link>
         <Link
          to='/command'
          className='border-t-2 border-r-2 mt-1 rotate-[225deg] h-3 w-3 block md:hidden'
        ></Link>

        <div className='flex flex-col-reverse py-[41px] md:py-0 md:flex-row md:space-y-0'>
          <img className='rounded-full w-[187px] h-[187px] mx-[35px]' src={img} alt={name} />

          <div className='flex flex-col items-center md:items-baseline mb-5 md:mb-0'>
            <h3 className='text-[36px] md:text-[64px]'>
              {`${name} ${surname}`}
            </h3>

            <p className='text-[20px] md:text-[32px]'>Партнер</p>
          </div>
        </div>

        <Link
          to='/'
          onClick={handleExit}
          className='border-[1px] ml-auto border-white rounded-[8px] px-[16px] py-[8px] self-start hidden md:inline-flex'
        >Выход</Link>

        <Link
          to='/'
          onClick={handleExit}
          className='self-start md:hidden'
        ><ExitIcon /></Link>
      </div>
    </div>
  )
}

export default CardUserHeader
