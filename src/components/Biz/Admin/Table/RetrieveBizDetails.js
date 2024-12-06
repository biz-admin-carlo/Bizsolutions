// // import React, { useContext, useState, useEffect } from 'react';
// // import { useParams } from 'react-router-dom';
// // import { Text, Spinner, Box, Card } from "@chakra-ui/react";
// // import { LuCheck } from "react-icons/lu";
// // import {
// //   TimelineConnector,
// //   TimelineContent,
// //   TimelineDescription,
// //   TimelineItem,
// //   TimelineRoot,
// //   TimelineTitle,
// // } from "../../../ui/timeline.jsx";
// // import UserContext from '../../../../utils/Contexts/userContext.js';
// // import { retrievePaymentHistoryUtil } from '../../../../utils/Biz/AdminUtils.js'; // Adjust the path as needed

// // export default function RetrieveBizDetails() {
// //   const { user } = useContext(UserContext);
// //   const { bizId } = useParams(); // Retrieve bizId from URL parameters
// //   const [businessDetails, setBusinessDetails] = useState(null);
// //   const [paymentHistory, setPaymentHistory] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true); // State to manage loading

// //   useEffect(() => {
// //     if (bizId) {
// //       fetchPaymentHistory(bizId);
// //     }
// //   }, [bizId]);

// //   const fetchPaymentHistory = async (bizId) => {
// //     setIsLoading(true);
// //     const result = await retrievePaymentHistoryUtil({ bizId });

// //     console.log(result);
// //     if (result && result.result === 'successful') {
// //       setBusinessDetails(result.businessDetails);
// //       setPaymentHistory(result.paymentHistory);
// //     } else {
// //       console.error('Failed to fetch payment history or no data available.');
// //     }
// //     setIsLoading(false);
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-2xl font-bold mb-4">
// //         {businessDetails ? `${businessDetails.bizName} Payment History` : 'Loading Business Details...'}
// //       </h1>
// //       <p className="text-sm text-gray-500">Business ID: {bizId}</p>

// //       {isLoading ? (
// //         <Box className="flex justify-center items-center mt-4">
// //           <Spinner size="xl" />
// //         </Box>
// //       ) : (
// //         <div className="py-5 px-5">
// //             <Card className="py-5 px-5">
// //           <TimelineRoot maxW="400px">
// //             {paymentHistory.length > 0 ? (
// //               paymentHistory.map((payment, index) => (
// //                 <TimelineItem key={index}>
// //                   <TimelineConnector>
// //                     <LuCheck />
// //                   </TimelineConnector>
// //                   <TimelineContent>
// //                     <TimelineTitle>Payment by {payment.customerName}</TimelineTitle>
// //                     <TimelineDescription>
// //                       Amount: ${payment.amountCaptured / 100} {payment.currency.toUpperCase()}
// //                     </TimelineDescription>
// //                     <Text textStyle="sm" className="text-gray-700">
// //                       Receipt: <a href={payment.receiptUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
// //                         View Receipt
// //                       </a>
// //                     </Text>
// //                     <Text textStyle="sm" className="text-gray-700">
// //                       Email: {payment.bizEmailAddress}
// //                     </Text>
// //                     <Text textStyle="sm" className="text-gray-700">
// //                       Description: {payment.chargeDescription}
// //                     </Text>
// //                     <Text textStyle="sm" className="text-gray-700">
// //                       Billing Address: {payment.billingDetails?.address?.line1}, {payment.billingDetails?.address?.city}, {payment.billingDetails?.address?.state} {payment.billingDetails?.address?.postal_code}
// //                     </Text>
// //                   </TimelineContent>
// //                 </TimelineItem>
// //               ))
// //             ) : (
// //               <Text textStyle="sm" className="text-gray-500">
// //                 No payment history found for this business.
// //               </Text>
// //             )}
// //           </TimelineRoot>
// //           </Card>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// import React, { useContext, useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Text, Spinner, Box, Card, Heading, Stack, Link, Divider } from "@chakra-ui/react";
// import { LuCheck } from "react-icons/lu";
// import {
//   TimelineConnector,
//   TimelineContent,
//   TimelineDescription,
//   TimelineItem,
//   TimelineRoot,
//   TimelineTitle,
// } from "../../../ui/timeline.jsx";
// import UserContext from '../../../../utils/Contexts/userContext.js';
// import { retrievePaymentHistoryUtil } from '../../../../utils/Biz/AdminUtils.js'; // Adjust the path as needed

// export default function RetrieveBizDetails() {
//   const { user } = useContext(UserContext);
//   const { bizId } = useParams(); // Retrieve bizId from URL parameters
//   const [businessDetails, setBusinessDetails] = useState(null);
//   const [paymentHistory, setPaymentHistory] = useState([]);
//   const [isLoading, setIsLoading] = useState(true); // State to manage loading

//   useEffect(() => {
//     if (bizId) {
//       fetchPaymentHistory(bizId);
//     }
//   }, [bizId]);

//   const fetchPaymentHistory = async (bizId) => {
//     setIsLoading(true);
//     const result = await retrievePaymentHistoryUtil({ bizId });

//     console.log(result);
//     if (result && result.result === 'successful') {
//       setBusinessDetails(result.businessDetails);
//       setPaymentHistory(result.paymentHistory);
//     } else {
//       console.error('Failed to fetch payment history or no data available.');
//     }
//     setIsLoading(false);
//   };

//   return (
//     <Box className="container mx-auto p-4">
//       <Heading as="h1" size="lg" mb={4} textAlign="center">
//         {businessDetails ? `${businessDetails.bizName} Payment History` : 'Loading Business Details...'}
//       </Heading>
//       <Text fontSize="sm" color="gray.500" textAlign="center">
//         Business ID: {bizId}
//       </Text>

//       {isLoading ? (
//         <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
//           <Spinner size="xl" />
//         </Box>
//       ) : (
//         <Box py={5} px={{ base: 2, md: 5 }}>
//           <Card shadow="md" p={5} borderRadius="lg">
//             {businessDetails && (
//               <Box mb={5}>
//                 <Text fontWeight="bold">Subscription Name:</Text>
//                 <Text>{businessDetails.subscriptionName}</Text>
//                 <Text fontWeight="bold">Payment Gateway:</Text>
//                 <Text>{businessDetails.paymentGateway}</Text>
//                 <Text fontWeight="bold">Amount Transacted:</Text>
//                 <Text>${businessDetails.amountTransacted}</Text>
//                 <Divider my={4} />
//               </Box>
//             )}

//             <TimelineRoot>
//               {paymentHistory.length > 0 ? (
//                 paymentHistory.map((payment, index) => (
//                   <TimelineItem key={index}>
//                     <TimelineConnector>
//                       <LuCheck />
//                     </TimelineConnector>
//                     <TimelineContent>
//                       <TimelineTitle>
//                         Payment by {payment.customerName}
//                       </TimelineTitle>
//                       <TimelineDescription>
//                         Amount: ${payment.amountCaptured / 100} {payment.currency.toUpperCase()}
//                       </TimelineDescription>
//                       <Stack spacing={1}>
//                         <Text fontSize="sm" color="gray.700">
//                           Email: {payment.customerEmail}
//                         </Text>
//                         <Text fontSize="sm" color="gray.700">
//                           Description: {payment.chargeDescription}
//                         </Text>
//                         <Text fontSize="sm" color="gray.700">
//                           Billing Address: {payment.billingDetails?.address?.line1}, {payment.billingDetails?.address?.city}, {payment.billingDetails?.address?.state} {payment.billingDetails?.address?.postal_code}
//                         </Text>
//                         <Link
//                           href={payment.receiptUrl}
//                           isExternal
//                           color="purple.500"
//                           textDecoration="underline"
//                           fontSize="sm"
//                         >
//                           View Receipt
//                         </Link>
//                       </Stack>
//                     </TimelineContent>
//                   </TimelineItem>
//                 ))
//               ) : (
//                 <Text textStyle="sm" color="gray.500">
//                   No payment history found for this business.
//                 </Text>
//               )}
//             </TimelineRoot>
//           </Card>
//         </Box>
//       )}
//     </Box>
//   );
// }



import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Text, Spinner, Box, Card, Heading, Stack, Link, Divider } from "@chakra-ui/react";
import { LuCheck } from "react-icons/lu";
import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from "../../../ui/timeline.jsx";
import UserContext from '../../../../utils/Contexts/userContext.js';
import { retrievePaymentHistoryUtil } from '../../../../utils/Biz/AdminUtils.js'; // Adjust the path as needed

export default function RetrieveBizDetails() {
  const { user } = useContext(UserContext);
  const { bizId } = useParams(); // Retrieve bizId from URL parameters
  const [businessDetails, setBusinessDetails] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading

  // Helper function for date formatting
  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(dateString));
  };

  useEffect(() => {
    if (bizId) {
      fetchPaymentHistory(bizId);
    }
  }, [bizId]);

  const fetchPaymentHistory = async (bizId) => {
    setIsLoading(true);
    const result = await retrievePaymentHistoryUtil({ bizId });

    if (result && result.result === 'successful') {
      setBusinessDetails(result.businessDetails);
      setPaymentHistory(result.paymentHistory);
    } else {
      console.error('Failed to fetch payment history or no data available.');
    }
    setIsLoading(false);
  };

  return (
    <Box className="container mx-auto p-4">
      <Heading as="h1" size="lg" mb={4} textAlign="center">
        {businessDetails ? `${businessDetails.bizName} Payment History` : 'Loading Business Details...'}
      </Heading>
      <Text fontSize="sm" color="gray.500" textAlign="center">
        Business ID: {bizId}
      </Text>

      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <Spinner size="xl" />
        </Box>
      ) : (
        <Box py={5} px={{ base: 2, md: 5 }}>
          <Card shadow="md" p={5} borderRadius="lg">
            {businessDetails && (
              <Box mb={5}>
                <Text fontWeight="bold">Subscription Name:</Text>
                <Text>{businessDetails.subscriptionName}</Text>
                <Text fontWeight="bold">Payment Gateway:</Text>
                <Text>{businessDetails.paymentGateway}</Text>
                <Text fontWeight="bold">Amount Transacted:</Text>
                <Text>${businessDetails.amountTransacted}</Text>
                <Text fontWeight="bold">Starting Billing Date:</Text>
                <Text>{formatDate(businessDetails.bizCreatedDateTime)}</Text>
                <Divider my={4} />
              </Box>
            )}

            <TimelineRoot>
              {paymentHistory.length > 0 ? (
                paymentHistory.map((payment, index) => (
                  <TimelineItem key={index}>
                    <TimelineConnector>
                      <LuCheck />
                    </TimelineConnector>
                    <TimelineContent>
                      <TimelineTitle>
                        Payment by {payment.customerName}
                      </TimelineTitle>
                      <TimelineDescription>
                        Amount: ${payment.amountCaptured / 100} {payment.currency.toUpperCase()}
                      </TimelineDescription>
                      <Stack spacing={1}>
                        <Text fontSize="sm" color="gray.700">
                          Email: {payment.customerEmail}
                        </Text>
                        <Text fontSize="sm" color="gray.700">
                          Description: {payment.chargeDescription}
                        </Text>
                        <Text fontSize="sm" color="gray.700">
                          Billing Address: {payment.billingDetails?.address?.line1}, {payment.billingDetails?.address?.city}, {payment.billingDetails?.address?.state} {payment.billingDetails?.address?.postal_code}
                        </Text>
                        <Text fontSize="sm" color="gray.700">
                          Payment Date: {formatDate(payment.paymentCreatedDateTime)}
                        </Text>
                        <Link
                          href={payment.receiptUrl}
                          isExternal
                          color="purple.500"
                          textDecoration="underline"
                          fontSize="sm"
                        >
                          View Receipt
                        </Link>
                      </Stack>
                    </TimelineContent>
                  </TimelineItem>
                ))
              ) : (
                <Text textStyle="sm" color="gray.500">
                  No payment history found for this business.
                </Text>
              )}
            </TimelineRoot>
          </Card>
        </Box>
      )}
    </Box>
  );
}
