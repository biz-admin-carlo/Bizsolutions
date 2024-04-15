// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container } from 'react-bootstrap';
// import BarSpinner from './Reusable_BarSpinner';

// const apiUrl = process.env.REACT_APP_API_URL;

// export default function AccountDetails({ user }) {
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('You have no subscription yet.');
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [showErrorModal, setShowErrorModal] = useState(false);

//   const token = sessionStorage.getItem('token');

//   useEffect(() => {
//     const getSubscriptions = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`${apiUrl}/api/v1/users/${user._id}/subscription`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log(response.data)
//         setMessage(response.data.message);
//         setShowSuccessModal(true);
//       } catch (error) {
//         console.error('Error fetching subscription:', error);
//         setShowErrorModal(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getSubscriptions();
//   }, [user._id, token]); // Dependencies array

//   if (loading) {
//     return <BarSpinner />;
//   }

//   return (
//     <Container className="pb-5">
//       <div className='my-3'>
//         <h2>Subscription</h2>
//       </div>
//       <div>
//         <hr />
//         <p>{message}</p>
//       </div>
//     </Container>
//   );
// }





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';
import BarSpinner from './Reusable_BarSpinner';

const apiUrl = process.env.REACT_APP_API_URL;

export default function AccountDetails({ user }) {
  const [loading, setLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [message, setMessage] = useState('You have no subscription yet.');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const getSubscriptions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/v1/users/${user._id}/subscription`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && response.data.length > 0) {
          setSubscriptions(response.data);
          setShowSuccessModal(true);
        } else {
          setMessage('No subscriptions found for this user.');
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
        setMessage('No subscriptions found for this user.');
        setShowErrorModal(true);
      } finally {
        setLoading(false);
      }
    };

    getSubscriptions();
  }, [user._id, token]);

  if (loading) {
    return <BarSpinner />;
  }

  return (
    <Container className="pb-5">
      <div className='my-3'>
        <h2>Subscription</h2>
      </div>
      <div>
        <hr />
        {subscriptions.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Plan ID</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Payment Mode</th>
                <th>Stripe Subscription ID</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub, index) => (
                <tr key={index}>
                  <td>{sub.planId}</td>
                  <td>{sub.startDate}</td>
                  <td>{sub.endDate}</td>
                  <td>{sub.modeOfPayment}</td>
                  <td>{sub.stripeSubscriptionId}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </Container>
  );
}
