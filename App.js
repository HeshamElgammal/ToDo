import React from 'react'
import Home_list from "./components/pages/home_list"
import { Provider } from "react-redux"
import { configStore } from './components/redux/store'


const App = () => {
  return (
    <>
      <Provider store={configStore}>
        <Home_list />
      </Provider>
    </>
  )
}



export default App