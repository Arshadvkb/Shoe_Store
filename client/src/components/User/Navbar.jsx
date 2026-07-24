
const Navbar = () => {
    const user=localStorage.getItem("Active User")
  return (
    <div>
    <button onClick={()=>localStorage.clear()}>logout</button>
{user}
    </div>
  )
}

export default Navbar
