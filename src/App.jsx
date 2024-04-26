import { useState,useCallback,useEffect,useRef } from 'react'

function App() {
  
  //variables
  const [length , setLength] = useState(8)
  const [numberAllowed , setNumberAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)
  const [password , setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  //passwordGenerator function
  const passwordGenerator = useCallback(() => {
      let pass = ""
      let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if(numberAllowed) string += "0123456789"
      if(charAllowed) string += "!@#$%&{}()"

      for(let i = 1 ; i <= length ; i++){
        let char = Math.floor(Math.random()*string.length +1)

        pass += string.charAt(char)
      }
      setPassword(pass)

  } , [length , numberAllowed , charAllowed , setPassword])

  //copy password function
  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    alert("password copied")
    window.navigator.clipboard.writeText(password)

  } ,[password])
  
  
  //useeffect hook
  useEffect(() => {
    passwordGenerator()

  },[length,numberAllowed,charAllowed,passwordGenerator])
 
  return (
    <>
      <div className='bg-gray-500 h-screen relative'>
          <div className=' absolute w-full max-w-md mx-auto shadow-md shadow-slate-800 rounded-lg px-4 py-4 my-8 text-red-800 text-center bg-zinc-300
           top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          '>
            <h1 className='mb-4'>Password Generator</h1>
            <div className='className="flex shadow rounded-lg overflow-hidden mb-4"'>
              <input
                type='text'
                value={password}
                className='outline-none w-full py-2 px-3'
                placeholder='your generated password'
                readOnly
                ref={passwordRef}
              />
              <button
                onClick={copyPassword}
                className='bg-red-500 p-2 rounded-lg text-white mb-2 mt-2 hover:bg-red-800'
              >Copy</button>
            </div>
            <div className='flex gap-1'>
                <input 
                  type='range'
                  min={8}
                  max={100}
                  value={length}
                  className='cursor-pointer'
                  onChange={(e) => {setLength(e.target.value)}}
                />
                <label>Length:{length}</label>
              <input 
                type='checkbox'
                defaultChecked={numberAllowed}
                id='numberAllowed'
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor='numberInput'>Numbers</label>    
              <input 
                type='checkbox'
                defaultChecked={charAllowed}
                id='charAllowed'
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor='charInput'>Character</label>          
            </div>  
          </div> 
      </div>   
   </>
  )
}

export default App
