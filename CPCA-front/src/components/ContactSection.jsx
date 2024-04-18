//
import React from "react";
import { MdEmail, MdLocalPhone } from "react-icons/md";
import ContactForm from "./ContactForm";
import ContactBanner from "./ContactBanner";
import ContactInfoItem from "./ContactInfoItem";
import SectionTitle from "./SectionTitle";

// const ContactSection = () => {
//   return (
//     <div>
//       <div className="container">
//         <div className="flex p-10 m-20 justify-between mt-0">
//           <div className="flex-1 ">
//             <ContactBanner></ContactBanner>
//             <ContactInfoItem icon={<MdLocalPhone />} text="+8801231" />
//             <ContactInfoItem icon={<MdEmail />} text="webcifar@gmail.com" />
//             <ContactInfoItem text="Chittagong, Bangladesh" />
//           </div>
//           <br></br>
//           <div className="flex-1 rounded-xl ">
//             <ContactForm />
//           </div>
//           <div className="absolute w-[2px] h-[50%] bg-gray-1 left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3 hidden md:block"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

const ContactSection = () => {
  return (
    <div>
      <div className="container -mt-12">
        <div className="flex flex-col sm:flex-row p-5 sm:p-10 m-3 sm:m-20 justify-between mt-0 sm:pr-0">
          <div className="flex-1 ">
            <ContactBanner />
            <ContactInfoItem icon={<MdLocalPhone />} text="+8801231" />
            <ContactInfoItem icon={<MdEmail />} text="webcifar@gmail.com" />
            <ContactInfoItem text="Chittagong, Bangladesh" />
          </div>
          <br className="sm:hidden" />
          <div className="rounded-xl ">
            <ContactForm />
          </div>
          <div className="absolute w-[2px] h-[50%] bg-gray-1 left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3 hidden md:block"></div>
        </div>
      </div>
    </div>
  );
};
export default ContactSection;
