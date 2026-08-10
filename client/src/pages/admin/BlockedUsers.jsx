import { useContext, useEffect } from "react";
import { Admincontext } from "../../context/Admin_conext";
import Layout from "./Layout";
import { Ban, UserRoundCheck } from "lucide-react";

const BlockedUsers = () => {
  const { state, FetchUser, UnBlockUser } = useContext(Admincontext);

  useEffect(() => {
    FetchUser();
  }, []);
  const blockedUsers = state.users.filter((u) => u.isBlocked === true);
  console.log(blockedUsers);

  return (
    <div>
      <Layout>
        <div className="w-full rounded-2xl border border-primary/20 bg-neutral p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100">
                <Ban size={22} className="text-red-500" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">
                  Blocked Users
                </h1>
                <p className="text-sm text-gray-500">
                  Manage users who are currently blocked
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-primary/10 px-4 py-2">
              <span className="text-sm font-medium text-primary">
                {blockedUsers.length} Blocked
              </span>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    User
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Email
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {blockedUsers.length > 0 ? (
                  blockedUsers.map((b) => (
                    <tr key={b.id} className="hover:bg-primary/5 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <span className="font-semibold text-primary">
                              {b.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="font-medium text-gray-800">
                            {b.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {b.email}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
                          <span className="h-2 w-2 rounded-full bg-red-500"></span>
                          Blocked
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => UnBlockUser(b.id)}
                          className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
                        >
                          <UserRoundCheck size={16} /> Unblock
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Ban size={35} className="text-gray-300" />
                        <p className="font-medium text-gray-600">
                          No blocked users
                        </p>
                        <p className="text-sm text-gray-400">
                          All users currently have access.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default BlockedUsers;
