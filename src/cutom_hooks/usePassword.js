import  { useState } from 'react'

const usePassword = () => {
    const [password , setPassword] = useState("");
    const [errorMessage , setErrorMessage] = useState("");

    const createPassword = (checkedData,length) => {
        let charset="" , generatePass="";
        let selectedOption = checkedData.filter(option => option.state)
        if(selectedOption.length ===0){
            setErrorMessage("Select atleast one checkbox to generate password!!")
            setPassword("")
            return;
        }
        selectedOption.forEach((el) => {
           switch(el.name){
            case "Use special characters" : {
               return charset += "@#%&*(){}[]"
              }
              case "Use Lowercase" : {
                return charset+= "abcdefghijklmnopqrstuvwxyz"
              }
              case "Use Uppercase": {
                return charset+= "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
              }
              case "Use Numbers": {
                return charset+= "123456789"
              }
            default : return null 
            }
           
        })
        for(let i=0; i<length; i++){
            let randomPass = Math.floor(Math.random() * charset.length)
            generatePass += charset[randomPass];
        }
        setPassword(generatePass)
        setErrorMessage("")
    }
    return {password , errorMessage , createPassword}
}

export default usePassword