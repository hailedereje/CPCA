/* eslint-disable react/prop-types */
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { useInviteStudentsMutation } from '@/services/classroomService'; // Import the hook for inviteStudents mutation
import toast from 'react-hot-toast';

const InviteForm = ({ classroomId }) => {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [inviteStudents, { isLoading, isError }] = useInviteStudentsMutation(); // Destructure the mutation hook

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        const emailList = json.map(row => row.email);
        setEmails(emailList);
      };
      reader.readAsArrayBuffer(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    let inviteEmails = emails;
    if (email) {
      inviteEmails = [...inviteEmails, email];
    }
    try {
      await inviteStudents({ emails: inviteEmails, classroomId }).unwrap(); // Call the inviteStudents mutation
      toast('Invitations sent successfully!');
      setEmail('');
      setEmails([]);
      setFile(null);
    } catch (error) {
      console.error('Error sending invitations', error);
      toast.error('Failed to send invitations. Please try again.');
    }
  };

  return (
    <form onSubmit={handleInvite}>
      <div>
        <label>Invite by Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label>Or Upload Excel File:</label>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        {file && <p>Selected file: {file.name}</p>}
      </div>
      <button type="submit" disabled={isLoading}>Send Invitations</button>
      {isError && <p>Error sending invitations. Please try again.</p>}
    </form>
  );
};

export default InviteForm;
