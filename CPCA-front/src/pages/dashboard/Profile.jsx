/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { ProfileInputElt } from "../../components";
import { HiOutlineMail as EmailIcon } from "react-icons/hi";
import { FaPhoneAlt as PhoneIcon, FaRegUser as NameIcon } from "react-icons/fa";
import { useEditUserInfoMutation, useFetchUserProfileQuery } from "@/api";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

console.log(cloudName); 

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
        studentId: user.studentId || "", // Populate Student ID field
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
      console.log("form Data", formData);
      if (response.data) {
        console.log("User info updated", response.data);
        toast.success("User info updated successfully");
        navigate(location.pathname); 
      } else {
        console.error("Error updating user info", response.error);
        toast.error("Failed to update user info");
      }
    } catch (err) {
      console.error("Error submitting form", err);
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
        console.log("Image uploaded:", imageUrl);
      }
    }).open();
  };

  return (
    user && (
      <div className="w-full grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3 bg-base-100">
          <div className="rounded-sm border border-base-300 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-base-300 py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium">Personal Information</h3>
            </div>
            <div className="p-7">
              <form onSubmit={handleSubmit}>
                <div className="mb-5 flex items-center gap-3">
                  <div className="border border-blue-200 h-24 w-24 rounded-full">
                    <img
                      className="w-full h-full rounded-full"
                      src={formData.profileImg || user.profileImg}
                      alt="User"
                    />
                  </div>
                  <div>
                    <span className="mb-1.5">Edit your photo</span>
                    <span className="flex gap-3">
                      <button
                        type="button"
                        className="text-sm hover:text-primary"
                        onClick={() => setFormData({ ...formData, profileImg: null })}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="text-sm hover:text-primary"
                        onClick={openUploadWidget}
                      >
                        Update
                      </button>
                    </span>
                  </div>
                </div>
                <div className="mb-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  <div className="w-full">
                    <ProfileInputElt
                      name="emailAddress"
                      type="email"
                      label="Email Address"
                      value={formData.emailAddress}
                      onChange={handleChange}
                      icon={<EmailIcon />}
                      readOnly={true} // Prevent editing email address
                    />
                  </div>
                  <div className="w-full">
                    <ProfileInputElt
                      name="studentId"
                      type="text"
                      label="Student ID"
                      value={formData.studentId}
                      onChange={handleChange}
                      icon={<NameIcon />}
                    />
                  </div>
                  <div className="w-full">
                    <ProfileInputElt
                      type="text"
                      name="fullName"
                      label="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      icon={<NameIcon />}
                    />
                  </div>
                  <div className="w-full">
                    <ProfileInputElt
                      type="text"
                      name="phoneNumber"
                      label="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      icon={<PhoneIcon />}
                    />
                  </div>
                  <div className="w-full">
                    <ProfileInputElt
                      type="text"
                      label="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      icon={<NameIcon />}
                    />
                  </div>
                  <div className="w-full">
                    <ProfileInputElt
                      type="text-area"
                      label="Bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex justify-start gap-4">
                <button
                    type="submit"
                    disabled={isSaving}
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  >
                    {isSaving ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                  <button
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="button"
                    onClick={() => setFormData({
                      fullName: user.fullName,
                      phoneNumber: user.phoneNumber,
                      emailAddress: user.emailAddress,
                      username: user.username,
                      bio: user.bio,
                      profileImg: user.profileImg,
                      studentId: user.studentId,
                    })}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
