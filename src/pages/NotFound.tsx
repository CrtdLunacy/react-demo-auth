import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='flex items-center flex-col space-y-5'>
      <img className='w-[700px] h-[700px]' src="/404.webp" alt="Not Found" />
      <p className='text-4xl'>Страница не найдена</p>
      <Link to='/' className='text-4xl text-[#512689] hover:bg-gray-100 p-3 rounded-lg'>Вернуться на главную</Link>
    </div>
  )
}

export default NotFound
