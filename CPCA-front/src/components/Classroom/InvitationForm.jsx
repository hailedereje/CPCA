/* eslint-disable react/prop-types */
import { useState } from 'react';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';
import { useInviteStudentsMutation } from '@/api';

const InviteForm = ({ classroomId }) => {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [inviteStudents, { isLoading, isError }] = useInviteStudentsMutation();

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

  const handleEmailKeyDown = (e) => {
    if (e.key === 'Enter' && email) {
      e.preventDefault();
      setEmails([...emails, email]);
      setEmail('');
    }
  };

  const handleDeleteEmail = (index) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    let inviteEmails = emails;
    if (email) {
      inviteEmails = [...inviteEmails, email];
    }
    try {
      await inviteStudents({ emails: inviteEmails, classroomId }).unwrap();
      toast.success('Invitations sent successfully!');
      setEmail('');
      setEmails([]);
      setFile(null);
    } catch (error) {
      console.error('Error sending invitations', error);
      toast.error('Failed to send invitations. Please try again.');
    }
  };

  return (
    <form onSubmit={handleInvite} className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Invite by Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          onKeyDown={handleEmailKeyDown}
          className="input input-bordered w-full"
          placeholder="Enter email and press Enter"
        />
        {emails.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {emails.map((email, index) => (
              <div key={index} className="badge badge-primary gap-2 items-center">
                {email}
                <button
                  type="button"
                  className="btn btn-xs btn-circle btn-error"
                  onClick={() => handleDeleteEmail(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Or Upload Excel File:</label>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="input input-bordered w-full"
        />
        {file && <p className="mt-2 text-gray-600">Selected file: {file.name}</p>}
      </div>
      <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Invitations'}
      </button>
      {isError && <p className="mt-2 text-red-500">Error sending invitations. Please try again.</p>}
    </form>
  );
};

export default InviteForm;
