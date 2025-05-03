import { useState, useCallback, useEffect, useRef } from 'react'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-orange-500 px-4">
      <div className="w-full max-w-md shadow-2xl rounded-xl px-6 py-5 bg-gray-900 border border-gray-700">
        <h1 className="text-2xl font-bold text-center text-white mb-6">🔐 Password Generator</h1>

        <div className="flex shadow-md rounded-lg overflow-hidden mb-5 bg-gray-800">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 bg-gray-800 text-white"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 transition duration-200"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-y-4 text-sm text-white">
          <div className="flex items-center justify-between">
            <label htmlFor="length">Length: {length}</label>
            <input
              type="range"
              id="length"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer w-2/3"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="numberInput">Include Numbers</label>
            <input
              type="checkbox"
              id="numberInput"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(prev => !prev)}
              className="accent-orange-500 w-5 h-5"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="characterInput">Include Special Characters</label>
            <input
              type="checkbox"
              id="characterInput"
              checked={charAllowed}
              onChange={() => setCharAllowed(prev => !prev)}
              className="accent-orange-500 w-5 h-5"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
