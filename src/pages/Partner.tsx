import axios from 'axios';
import { useEffect, useState } from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import CardUserBody from '../components/CardUserBody';
import CardUserHeader from '../components/CardUserHeader';

export type PartnerData = {
    id?: number;
    email?: string;
    first_name?: string;
    last_name?: string;
    avatar?: string;
}

function Partner() {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');
  const navigate = useNavigate();
  const [data, setData] = useState<PartnerData>({});

  useEffect(() => {
    if(!id) navigate('/404')

    axios.get(`https://reqres.in/api/users/${id}`)
    .then(function (response) {
      setData({...data, ...response.data.data})
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [])

  console.log(data);

  return (
    <div>
      <CardUserHeader
        img={data.avatar}
        name={data.first_name}
        surname={data.last_name}
      />

      <CardUserBody
        email={data.email}
      />
    </div>
  )
}

export default Partner
