import React, { useState, useEffect } from "react";
import axios from "axios";


const UserPage = () => {
  const [userList, setUserList] = useState([]);
  axios.defaults.withCredentials = true

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {

    axios
    .get('http://localhost:5000/api/users',{withCredentials: true})
    .then(res => {
      console.log(res.data);
      setUserList(res.data)
    });

}

  return (
    <>
      {userList ? (
        userList.map(user =>
             <p>Username: {user.username}</p>
             )
      ) : (
        <p>ya ain't logged in seen</p>
      )}
    </>
  );
};

export default UserPage;
