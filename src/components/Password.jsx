import React, { useState } from 'react';
import "./password.css"
import usePassword from '../customHook/usePassword';

const Password = () => {
    const [length , setLength] = useState(4);
    const [copy,setCopy] = useState(false)
    
    const [checkedData , setCheckedData] = useState([
        {name:"Use special characters", state: false},
        {name:"Use Lowercase" , state: false},
        {name:"Use Uppercase" , state: false},
        {name:"Use Numbers" , "sate":false}
    ])
    
    const handleCheckBox = (i) => {
        let newCheckedData = [...checkedData];
        newCheckedData[i].state = !newCheckedData[i].state
        setCheckedData(newCheckedData);
    }
    const {errorMessage , password , createPassword} = usePassword()

    const handleCopy = () => {
        navigator.clipboard.writeText(password)
        setCopy(true)
        setTimeout(() => {
            setCopy(false)
        },1000)
    }
  return (
    <div className='container'>
        {password && <div className='password_title'>
            <h1>{password}</h1>
            <button onClick={handleCopy}>{!copy ? "copy":"copied"}</button>
        </div>}
        <div className='password_length'>
            <h1>Password Length</h1>
            <h1>{length}</h1>
        </div>
        <div className='input'>
             <input type="range" min="4" max="20" value={length} onChange={(e) => setLength(e.target.value)} />
        </div>
        <div>
            <h1>Select the following to generate password</h1>
             {
                checkedData && checkedData.map((el,index) => {
                    return <span className='checkbox' key={index}><input type='checkbox' onChange={() => handleCheckBox(index)} checked={el.state} /> <label>{el.name}</label></span>
                })
             }
        </div>
        <h3 className='error'>{errorMessage}</h3>
        <button className='create_password' onClick={() => createPassword(checkedData,length)}>Create Password</button>
    </div>
  )
}

export default Password