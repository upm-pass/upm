import './App.css'
import storage from 'electron-localstorage'

// import Passwords from './components/Passwords'
import NewPassword from './components/NewPassword'



function App() {
  return (
    <div>
      <NewPassword />
      {console.log(storage.clear())}
    </div>
  )
}

export default App
