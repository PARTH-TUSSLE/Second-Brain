import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config';

function UseContent() {

  const [contents, setContents] = useState([]);
  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/content`, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }).then((res) => {
      setContents(res.data.Content)
    })
  }, [])

  return contents;
}

export default UseContent