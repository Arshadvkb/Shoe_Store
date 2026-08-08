import { NavLink } from "react-router-dom";


const ViewAll = (props) => {
  return (
    <div>
      <div className="flex justify-between pt-3 pb-2  ">
        <h1 className="text-2xl font-bold">{props.name}</h1>
        <NavLink
          to="/admin/view-users"
          className="h-10 w-28 bg-neutral border border-primary rounded-xl flex items-center justify-center text-sm font-medium hover:bg-primary/10 transition"
        >
          <span>View all</span>
        </NavLink>
      </div>
    </div>
  );
}

export default ViewAll
