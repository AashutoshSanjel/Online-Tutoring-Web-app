import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [showJobs, setShowJobs] = useState(false);
  const [showHamroShikshyaMeetUsers, setShowHamroShikshyaMeetUsers] = useState(false);

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

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/v1/job/getall', { withCredentials: true });
      setJobs(data.jobs);
    } catch (error) {
      console.error("Error fetching jobs", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/user/${userId}`, { withCredentials: true });
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className="adminContainer">
      <div className="buttonContainer">
        <div className="userBox" onClick={() => setShowUsers(!showUsers)}>
          View Users
        </div>
        <div className="userBox" onClick={() => window.location.href = 'https://dashboard.clerk.com/apps/app_2eoIzsrBqpx6KDYJOeUgbaD4AnX/instances/ins_2eoIzsWK6EqeQO7JNlKXTlqNY5a/users'}>
          View All User Hamro Shikshya Meet
        </div>
        <div className="userBox" onClick={() => { setShowJobs(!showJobs); fetchJobs(); }}>
          View Subjects
        </div>
      </div>
      {showUsers && (
        <div>
          <div className="totalUsers">
            Total Users: {users.length}
          </div>
          <div className="userList">
            {users.map(user => (
              <div key={user._id} className="userDetails">
                <span>{user.name} - {user.email}</span>
                <button onClick={() => deleteUser(user._id)} className="deleteButton">Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}
      {showJobs && (
        <div>
          <div className="totalJobs">
            Total Subjects: {jobs.length}
          </div>
          <div className="jobList">
            {jobs.map(job => (
              <div key={job._id} className="jobDetails">
                <span>{job.title} - {job.location.city}, {job.country}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
