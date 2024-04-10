import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Admin = () => {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/v1/user/allusers', { withCredentials: true });
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/user/${userId}`, { withCredentials: true });
      toast.success('User deleted successfully');
      // Re-fetch the user list to reflect the deletion without reloading the page
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className="adminContainer">
      <div className="userBox" onClick={() => setShowUsers(!showUsers)}>
        View Users
      </div>
      {showUsers && (
        <div className="userList">
          {users.map(user => (
            <div key={user._id} className="userDetails">
              <span>{user.name} - {user.email}</span>
              <button onClick={() => deleteUser(user._id)} className="deleteButton">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
