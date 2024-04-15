// // import React from 'react';
// // import { MdPlace } from 'react-icons/md';
// // import styled from 'styled-components';
// // import PText from './PText';

// // const ItemStyles = styled.div`
// //   padding: 2rem;
// //   background-color: var(--deep-dark);
// //   display: flex;
// //   align-items: center;
// //   gap: 2rem;
// //   border-radius: 8px;
// //   margin-bottom: 2rem;
// //   .icon {
// //     color: var(--white);
// //     background-color: var(--gray-2);
// //     padding: 1.3rem;
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
// //     border-radius: 50%;
// //   }
// //   svg {
// //     width: 3.5rem;
// //   }
// // `;

// // export default function ContactInfoItem({
// //   icon = <MdPlace />,
// //   text = 'I need text ',
// // }) {
// //   return (
// //     <ItemStyles>
// //       <div className="icon">{icon}</div>
// //       <div className="info">
// //         <PText>{text}</PText>
// //       </div>
// //     </ItemStyles>
// //   );
// // }

// import React from "react";
// import { MdPlace } from "react-icons/md";

// const ContactInfoItem = ({ icon = <MdPlace />, text = "I need text" }) => {
//   return (
//     <div className=" p-5 flex items-center gap-8 rounded-md ">
//       <div className="p-5 rounded-full">{icon}</div>
//       <p className="font-mono">{text}</p>
//     </div>
//   );
// };

// export default ContactInfoItem;

import React from "react";
import { MdPlace } from "react-icons/md";

const ContactInfoItem = ({ icon = <MdPlace />, text = "I need text" }) => {
  return (
    <div className="p-5 flex items-center gap-8 rounded-md sm:p-8 sm:gap-10 md:p-10 md:gap-12">
      <div className="p-4 sm:p-5 rounded-full">
        {React.cloneElement(icon, {
          className: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8",
        })}
      </div>
      <p className="font-mono text-sm sm:text-base md:text-lg">{text}</p>
    </div>
  );
};

export default ContactInfoItem;
