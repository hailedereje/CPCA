/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { ProfileInputElt } from "../../components";
import { HiOutlineMail as EmailIcon } from "react-icons/hi";
import { FaPhoneAlt as PhoneIcon, FaRegUser as NameIcon } from "react-icons/fa";
import { useEditUserInfoMutation, useFetchUserProfileQuery } from "@/api";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineCancel, MdOutlineDescription, MdOutlineSave } from "react-icons/md";
import { RiImageEditLine, RiDeleteBin6Line } from "react-icons/ri";
import blankProfile from "../../assets/blank_profile.webp";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export default function Profile() {
  const { data: user, refetch: refetchUserProfile } = useFetchUserProfileQuery({
    refetchOnMountOrArgChange: true,
  });
  const [editUserInfo, { isLoading: isSaving, error }] = useEditUserInfoMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    username: "",
    bio: "",
    profileImg: "",
    studentId: "",
  });

  useEffect(() => {
    refetchUserProfile();
  }, [refetchUserProfile]);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        phoneNumber: user.phoneNumber || "",
        emailAddress: user.email || "",
        username: user.username || "",
        bio: user.bio || "",
        profileImg: user.profileImg || "",
        studentId: user.studentId || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await editUserInfo(formData);
      if (response.data) {
        toast.success("User info updated successfully");
        navigate(location.pathname);
      } else {
        toast.error("Failed to update user info");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const openUploadWidget = () => {
    const uploadOptions = {
      cloudName: cloudName,
      uploadPreset: "profileImgs",
      folder: "profileImgs",
    };

    window.cloudinary.createUploadWidget(uploadOptions, (error, result) => {
      if (error) console.error(error);
      if (result && result.event === "success") {
        const imageUrl = result.info.secure_url;
        setFormData({
          ...formData,
          profileImg: imageUrl,
        });
      }
    }).open();
  };

  return (
    user && (
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="py-4 px-6 bg-blue-400">
            <h3 className="text-lg font-semibold text-white">Personal Information</h3>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-6 flex items-center gap-6">
                <div className="relative w-24 h-24 border border-blue-200 rounded-full flex items-center">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={formData.profileImg || user.profileImg || blankProfile}
                    alt="User"
                  />
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 p-1 bg-blue-600 text-white rounded-full"
                    onClick={openUploadWidget}
                  >
                    <RiImageEditLine className="text-xl" />
                  </button>
                </div>
                <div>
                  <span className="block mb-1">Edit your photo</span>
                  <span className="flex gap-3">
                    <button
                      type="button"
                      className="text-sm text-red-600 hover:underline"
                      onClick={() => setFormData({ ...formData, profileImg: null })}
                    >
                      <RiDeleteBin6Line className="inline mr-1" /> Delete
                    </button>
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:underline"
                      onClick={openUploadWidget}
                    >
                      <RiImageEditLine className="inline mr-1" /> Update
                    </button>
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ProfileInputElt
                  name="emailAddress"
                  type="email"
                  label="Email Address"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  icon={<EmailIcon />}
                  readOnly={true}
                  className="border border-blue-400"
                />
                <ProfileInputElt
                  name="studentId"
                  type="text"
                  label="Student ID"
                  value={formData.studentId}
                  onChange={handleChange}
                  icon={<NameIcon />}
                  className="border border-blue-400"
                />
                <ProfileInputElt
                  type="text"
                  name="fullName"
                  label="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  icon={<NameIcon />}
                  className="border border-blue-400"
                />
                <ProfileInputElt
                  type="text"
                  name="phoneNumber"
                  label="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  icon={<PhoneIcon />}
                  className="border border-blue-400"
                />
                <ProfileInputElt
                  type="text"
                  name="username"
                  label="Username"
                  value={formData.username}
                  onChange={handleChange}
                  icon={<NameIcon />}
                  className="border border-blue-400"
                />
                <ProfileInputElt
                  type="textarea"
                  name="bio"
                  label="Bio"
                  value={formData.bio}
                  onChange={handleChange}
                  icon={<MdOutlineDescription />}
                  className="border border-blue-400"
                />
              </div>
              <div className="flex justify-start gap-4 mt-6">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  {isSaving ? (
                    <>
                      <span className="loading loading-spinner mr-2"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <MdOutlineSave className="mr-2" />
                      Save
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="flex items-center bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
                  onClick={() =>
                    setFormData({
                      fullName: user.fullName,
                      phoneNumber: user.phoneNumber,
                      emailAddress: user.emailAddress,
                      username: user.username,
                      bio: user.bio,
                      profileImg: user.profileImg,
                      studentId: user.studentId,
                    })
                  }
                >
                  <MdOutlineCancel className="mr-2" />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
}
