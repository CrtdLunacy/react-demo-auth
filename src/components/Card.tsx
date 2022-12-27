import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import LikeIcon from '../icons/LikeIcon';

export type UserProps = {
  img: string | undefined;
  name: string | undefined;
  surname: string | undefined;
  id?: number;
}

function Card({img, name, surname, id}: UserProps) {
  const [fill, setFill] = useState(false);

  const handleLike = () => {
    setFill(!fill);
  }

  return (
    <div className='relative cursor-pointer min-w-[150px] min-h-[150px] p-[20px] pt-[36px] flex flex-col items-center space-y-5 rounded-[10px] shadow-lg'>
      <img className='rounded-full' src={img} alt={name} />

      <p>{`${name} ${surname}`}</p>

      <LikeIcon like={handleLike} fill={fill} />
      <Link to={`/command/user?id=${id}`} className='absolute top-0 mt-0 text-center h-full w-full' />
    </div>
  )
}

export default Card
