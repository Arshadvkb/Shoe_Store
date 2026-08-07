import { useContext } from "react";
import { Admincontext } from "../../context/Admin_conext";
import { User } from "lucide-react";
import { NavLink } from "react-router-dom";

const User_Table = () => {
  const { state } = useContext(Admincontext);
  const users = state.users;
  return (
    <div className="px-5 h-107 overflow-y-auto rounded-xl border border-primary">
      <div className="flex justify-between pt-3 pb-2  ">
        <h1 className="text-2xl font-bold">Users</h1>
        <NavLink
          to="/admin/view-users"
          className="h-10 w-40 bg-neutral border border-primary rounded-xl flex justify-center items-center"
        >
          <span >
            View all
            </span>
        </NavLink>
      </div>
      <table className="w-full table-fixed ">
        <thead className="sticky top-0  ">
          <tr className="text-gray-500 text-sm">
            <th className="w-[28%] text-left px-4 py-4">User</th>
            <th className="w-[35%] text-left px-4 py-4">Email</th>
            <th className="w-[17%] text-center px-4 py-4">Status</th>
            <th className="w-[20%] text-center px-4 py-4">Joined</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b last:border-none hover:bg-primary/5 transition"
            >
              <td className="py-4">
                <div className="flex items-center gap-3 pl-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center  font-semibold text-primary">
                    <User />
                  </div>

                  <div>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>
              </td>

              <td className="py-4 truncate pr-4 text-gray-600">{user.email}</td>

              <td className="py-4 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.isBlocked
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {user.isBlocked ? "Blocked" : "Active"}
                </span>
              </td>

              <td className="py-4 text-center text-gray-600 whitespace-nowrap">
                {new Date(user.joined).toLocaleDateString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User_Table;
