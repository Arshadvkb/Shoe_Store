
const Navbar = () => {
    const user=localStorage.getItem("Active User")
  return (
    <div>
      <button onClick={() => localStorage.removeItem("Active User")}>
        logout
      </button>
      {user}
    </div>
  );
}

export default Navbar
