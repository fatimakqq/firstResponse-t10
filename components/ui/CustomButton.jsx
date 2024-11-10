import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const CustomButton = ({ title, time, location }) => {
    return (
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-green-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg"
        >
          <div className="p-4">
            <div className="flex justify-between">
              <h2 className="text-right text-lg font-bold">{title}</h2>
              <h3 className="text-right text-sm font-light mt-6">{time}</h3>
            </div>
            <div className="flex justify-start mt-6">
              <h3 className="text-left text-sm font-light">{location}</h3>
            </div>
          </div>
        </motion.button>
      </div>
    );
  };
  
  export default CustomButton;

// const Button = styled(motion.button)`
//   width: 313px;
//   height: 84px;
//   background-color: rgba(39, 88, 68, 0.5);
//   color: #fff;
//   border: none;
//   cursor: pointer;
//   font-size: 1.5rem;
//   font-weight: bold;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 0 20px;

//   &:hover {
//     background-color: rgba(220, 116, 0, 0.4);
//   }
// `;

// export const CustomButton = ({ title, time, location }) => {
//     return (
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="bg-green-600 hover:bg-orange-500 active:bg-orange-400 focus:outline-none rounded-lg p-4 text-white"
//       >
//         <div className="flex flex-row justify-between">
//           <div className="flex flex-col justify-center items-start w-3/5 pr-2">
//             <div className="text-lg font-bold text-right">{title}</div>
//             <div className="text-sm font-light text-right mt-6">{time}</div>
//           </div>
//           <div className="flex flex-col justify-center items-end w-2/5 pl-2">
//             <div className="text-sm font-light text-left">{location}</div>
//           </div>
//         </div>
//       </motion.button>
//     );
//   };
  
//   const EmergencyLogCard = ({ title, time, location }) => {
//     return (
//       <div className="bg-green-400 rounded-lg overflow-hidden">
//         <motion.div
//           className="px-15 py-15"
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.2 }}
//         >
//           <h2 className="text-right text-30">{title}</h2>
//           <p className="text-right text-15 mt-6">{time}</p>
//           <p className="text-left text-15 mt-4 ml-2">{location}</p>
//         </motion.div>
//         <CustomButton />
//       </div>
//     );
//   };

// export default { CustomButton, EmergencyLogCard };