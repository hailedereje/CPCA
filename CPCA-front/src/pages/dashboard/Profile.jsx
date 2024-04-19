import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../store";
import { ProfileInputElt } from "../../components";
import { HiOutlineMail as EmailIcon} from "react-icons/hi";
import { FaPhoneAlt as PhoneIcon} from "react-icons/fa";
import { FaRegUser as NameIcon } from "react-icons/fa";




export const action = (store) => {
  return async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);
  };
};

function Profile() {
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();
  // {
  //   username: "Abebe";
  //   email: "abebe@gmail.com";
  //   isAdmin: false;
  //   isInstructor: false;
  //   profileImg: "https://res.cloudinary.com/ddc2e1mzy/image/upload/v1710829762/your_folder_name/logo.jpg";
  //   role: "student";
  //   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY4MjEzODZlNTM3MWJkZWU1YzBiZmIiLCJpYXQiOjE3MTE0ODk4MTEsImV4cCI6MTcxNDA4MTgxMX0.Fz1PN4Pw0fwkqsZj3cSGww1KN0n4ABqqAke2cFYnGT4";
  // }
  console.log(user);
  // return (
  //   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  //     <div className="card bordered">
  //       <figure>
  //         <img src={user.profileImg} />
  //       </figure>
  //       <div className="card-body">
  //         <h2 className="card-title">{user.username}</h2>
  //         <p>{user.email}</p>
  //         <div
  //           className={`badge ${
  //             user.role === "admin"
  //               ? "badge-primary"
  //               : user.role === "instructor"
  //               ? "badge-secondary"
  //               : "badge-accent"
  //           }`}
  //         >
  //           {user.role}
  //         </div>
  //         <div className="justify-end card-actions">
  //           <button className="btn btn-primary">Edit Profile</button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="grid grid-cols-5 gap-8 ">
      <div className="col-span-5 xl:col-span-3 bg-base-100">
        <div className="rounded-sm border border-base-300   shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-base-300 py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium">Personal Information</h3>
          </div>
          <div className="p-7">
            <form action="#">
              <div className="mb-5  flex flex-col gap-[5.5] sm:flex-row">
                <div className="w-full sm:w-1/2 mr-3">
                 
                  <ProfileInputElt
                    type={"text"}
                    name="fullName"
                    label="Full Name"
                    defaultValue={"David Abrham"}
                    icon={<NameIcon />}

                  />
                </div>

                <div className="w-full sm:w-1/2">
                  <ProfileInputElt
                    type={"text"}
                    name="phoneNumber"
                    label="Phone Number"
                    defaultValue={"0945664412"}
                  />
                </div>
              </div>

              <div className="mb-5">
               
                <ProfileInputElt
                  name={"emailAddress"}
                  type={"email"}
                  label={"Email Address"}
                  defaultValue={"david@gmail.com"}
                />
              </div>

              <ProfileInputElt
                type="text"
                label={"Username"}
                name={"username"}
                defaultValue={"david@123"}
              />

              <div className="mb-5">
                <ProfileInputElt type = 'text-area' label={'Bio'}/>
                {/* <label
                  className="mb-3  block text-sm font-medium "
                  htmlFor="Username"
                >
                  BIO
                </label>
                <div className="relative ">
                  <span className="absolute left-4 top-4 ">
                    <svg
                      className="fill-current p-0"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                          fill=""
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                          fill=""
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_88_10224">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>

                  <textarea
                    className="w-full rounded   py-3 pl-11 pr-4.5d focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4  ark:focus:border-primary"
                    name="bio"
                    id="bio"
                    rows={6}
                    placeholder="Write your bio here"
                    defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet."
                  ></textarea>
                </div> */}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type="submit"
                >
                  Cancel
                </button>
                <button
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-span-5 xl:col-span-2 bg-base-100">
        <div className="rounded-sm    shadow-default ">
          <div className=" py-4 px-7 ">
            <h3 className="font-medium ">Your Photo</h3>
          </div>
          <div className="p-7">
            <form action="#">
              <div className="mb-9 flex items-center gap-3">
                <div className=" border border-blue-200 h-14 w-14 rounded-full">
                  <img
                    className="w-full h-full rounded-full"
                    src={user.profileImg}
                    alt="User"
                  />
                </div>
                <div>
                  <span className="mb-1.5">Edit your photo</span>
                  <span className="flex gap-3">
                    <button className="text-sm hover:text-primary">
                      Delete
                    </button>
                    <button className="text-sm hover:text-primary">
                      Update
                    </button>
                  </span>
                </div>
              </div>

              <div
                id="FileUpload"
                className="relative mb-5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                        fill="#3C50E0"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                        fill="#3C50E0"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                        fill="#3C50E0"
                      />
                    </svg>
                  </span>
                  <p>
                    <span className="text-primary">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                  <p>(max, 800 X 800px)</p>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  className="flex justify-center rounded  py-2 px-6 font-medium  hover:shadow-1  "
                  type="submit"
                >
                  Cancel
                </button>
                <button
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
