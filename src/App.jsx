
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [users, setUser] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUser(data))
  },[])

  const hadleSubmit = e =>{
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email}
    // console.log(name,email);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body:JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      const newUser = [...user,data]
      setUser(newUser)
      form.reset();
    })
  }

  return (



    <>
      <h2>management system</h2>
      <h1>total user: {users?.length}</h1>

      <form onSubmit={hadleSubmit}>
      <input type="text" name="name" id="" /><br />
      <input type="email" name="email" id="" /><br />
      <input type="submit" value="submit" />
      </form>

      {
        users.map(user => <div>
          <h2>{user.name}</h2>
          <h1>{user.email}</h1>
        </div>)
      }
    </>
  )
}

export default App
