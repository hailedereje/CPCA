import newRequests from '@/utils/newRequest';
import { useEffect, useState } from 'react'; 
import { useQuery } from 'react-query';
import UserDetails from './UserDetails';

const StudentsList = () => {
  const [users, setUsers] = useState([])
  const { isLoading, data } = useQuery("getAllStudents", async () => {
    const res = await newRequests.get("/user/students");
    console.log(res.data)
    return res.data;
  });

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  return isLoading ? (
    <div>
      <iframe
        className="w-4/5 h-96 ml-40"
        src="https://embed.lottiefiles.com/animation/9844"
      ></iframe>
    </div>
  ) : (
    <UserDetails users={users} />
)}

export default StudentsList