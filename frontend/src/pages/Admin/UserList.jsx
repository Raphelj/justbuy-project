import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes, FaUsers } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";


const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        toast.success("User deleted successfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      toast.success("User updated successfully");
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="p-8 md:p-12"> {/* Added padding-left for AdminMenu clearance if needed, or just standard padding */}
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-heading font-black text-white mb-8 flex items-center gap-3">
            <span className="p-3 rounded-full bg-white/5 text-primary"><FaUsers size={24} /></span> Manage Users
          </h1>

          {isLoading ? (
            <div className="flex justify-center h-64 items-center"><Loader /></div>
          ) : error ? (
            <Message variant="danger">{error?.data?.message || error.error}</Message>
          ) : (
            <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 text-gray-400 text-sm uppercase tracking-wider border-b border-white/5">
                      <th className="p-6 font-medium">ID</th>
                      <th className="p-6 font-medium">Name</th>
                      <th className="p-6 font-medium">Email</th>
                      <th className="p-6 font-medium text-center">Admin</th>
                      <th className="p-6 font-medium text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-white/5 transition-colors group"
                      >
                        <td className="p-6 text-sm font-mono text-gray-500">{user._id}</td>

                        {/* Editable Name */}
                        <td className="p-6">
                          {editableUserId === user._id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={editableUserName}
                                onChange={(e) => setEditableUserName(e.target.value)}
                                className="w-full bg-black/40 border border-primary/50 text-white rounded-lg px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                              />
                              <button
                                onClick={() => updateHandler(user._id)}
                                className="p-2 bg-primary text-black rounded-lg hover:bg-yellow-400 transition-colors"
                              >
                                <FaCheck />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium">{user.username}</span>
                              <button
                                onClick={() => toggleEdit(user._id, user.username, user.email)}
                                className="text-gray-500 hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <FaEdit />
                              </button>
                            </div>
                          )}
                        </td>

                        {/* Editable Email */}
                        <td className="p-6">
                          {editableUserId === user._id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={editableUserEmail}
                                onChange={(e) => setEditableUserEmail(e.target.value)}
                                className="w-full bg-black/40 border border-primary/50 text-white rounded-lg px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                              />
                              <button
                                onClick={() => updateHandler(user._id)}
                                className="p-2 bg-primary text-black rounded-lg hover:bg-yellow-400 transition-colors"
                              >
                                <FaCheck />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <a
                                href={`mailto:${user.email}`}
                                className="text-gray-400 hover:text-white transition-colors"
                              >
                                {user.email}
                              </a>
                              <button
                                onClick={() => toggleEdit(user._id, user.username, user.email)}
                                className="text-gray-500 hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <FaEdit />
                              </button>
                            </div>
                          )}
                        </td>

                        {/* Admin Status */}
                        <td className="p-6 text-center">
                          {user.isAdmin ? (
                            <FaCheck className="text-green-500 inline" />
                          ) : (
                            <FaTimes className="text-red-500 inline" />
                          )}
                        </td>

                        {/* Delete Button */}
                        <td className="p-6 text-center">
                          {!user.isAdmin && (
                            <button
                              onClick={() => deleteHandler(user._id)}
                              className="p-2 bg-white/5 hover:bg-red-500 hover:text-white text-gray-400 rounded-lg transition-all"
                            >
                              <FaTrash />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
