
import { useContext, useEffect } from "react";
import Layout from "./Layout";
import { Admincontext } from "../../context/Admin_conext";

const View_Users = () => {
  const { state, BlockUser,FetchUser } = useContext(Admincontext);
  useEffect(()=>{
FetchUser()
  },[])
  const users= state.users.filter(u=>u.role!=="admin" && u.isBlocked!=true)
  console.log(users);
  
return (
  <Layout>
    <div className="p-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage registered users and their account status
        </p>
        <a href="">Blocked users</a>
      </div>

      {/* Table Card */}
      <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-900">All Users</h2>
            <p className="text-sm text-gray-500">{users.length} users</p>
          </div>
        </div>

        {/* Scrollable Table */}
        <div className="max-h-[600px] overflow-y-auto overflow-x-auto">
          <table className="w-full text-left">
            <thead className="sticky top-0 z-10 bg-tertiary">
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  User
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Email
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Status
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => {
              

                return (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 hover:bg-primary/5 transition-colors"
                  >
                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-semibold">
                            {user.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>

                        <div>
                          <p className="font-medium text-gray-900">
                            {user.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {user.isBlocked ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                          <span className="h-2 w-2 rounded-full bg-red-500" />
                          Blocked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                          <span className="h-2 w-2 rounded-full bg-green-500" />
                          Active
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => BlockUser(user.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          user.isBlocked
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-red-100 text-red-600 hover:bg-red-200"
                        }`}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Layout>
);
};

export default View_Users;
