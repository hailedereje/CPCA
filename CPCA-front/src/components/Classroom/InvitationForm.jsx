import { useState } from 'react';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';
import { useInviteStudentsMutation } from '@/api';
import { AiFillFileExcel } from 'react-icons/ai';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useOutletContext } from 'react-router-dom';

const InviteForm = () => {
  const { classroom } = useOutletContext(); 
  const classroomId = classroom._id;
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [inviteStudents, { isLoading, isError, error }] = useInviteStudentsMutation();

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
        const emailList = json.map(row => Object.keys(row).find(key => key.toLowerCase() === 'email') ? row[Object.keys(row).find(key => key.toLowerCase() === 'email')] : null).filter(email => email);
        if (emailList.length === 0) {
          toast.error('Please make sure your Excel file contains a header named "email".');
        }
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
    } catch (err) {
      console.error('Error sending invitations', error);
      toast.error(error.msg || 'Failed to send invitations. Please try again.');
    }
  };

  return (
    <form onSubmit={handleInvite} className="p-6 w-1/2 border border-base-100 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Invite by Email / Upload Excel File</label>
        <div className="flex items-center">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            onKeyDown={handleEmailKeyDown}
            className="input input-bordered w-full"
            placeholder="Enter email and press Enter"
          />
          <label className="cursor-pointer text-5xl ml-2" title="Upload an Excel file with a header named 'email'">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="hidden"
            />
            <AiFillFileExcel className="mr-2 text-green-500"/>
          </label>
        </div>
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
      {file && <p className="ml-4 mt-2 text-gray-600">Selected file: {file.name}</p>}
      <div className="flex items-center text-info mb-4">
        <AiOutlineInfoCircle className="mr-2 text-xl" />
        <p>Please ensure your Excel file contains a header named "email".</p>
      </div>
      <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Invitations'}
      </button>
      {isError && <p className="mt-2 text-red-500">Error sending invitations. Please try again.</p>}
    </form>
  );
};

export default InviteForm;
