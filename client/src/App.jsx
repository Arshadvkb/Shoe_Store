import Admin_router from "./routes/Admin_router"
import Auth_router from "./routes/Auth_router"
import User_router from "./routes/User_router"

const App = () => {
  return (
    <div>
      <Auth_router/>
      <Admin_router/>
      <User_router/>
    </div>
  )
}

export default App
