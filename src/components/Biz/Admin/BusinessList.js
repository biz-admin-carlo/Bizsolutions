import React from 'react';
import { Accordion, ListGroup, Card, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BusinessListItem from './BusinessListItem';

export default function BusinessList({ 
  businesses, 
  transactions, 
  fullNames, 
  onOpenModal, 
  onOpenArchiveModal, 
  onOpenTransactModal,
  formatDate,
  visibleTransactions,
  setVisibleTransactions
}) {
  return (
    <div className="table-responsive">
      <Accordion defaultActiveKey="0">
        {businesses.map((biz, index) => (
          <BusinessListItem 
            key={index}
            biz={biz}
            index={index}
            transactions={transactions}
            fullNames={fullNames}
            onOpenModal={onOpenModal}
            onOpenArchiveModal={onOpenArchiveModal}
            onOpenTransactModal={onOpenTransactModal}
            formatDate={formatDate}
            visibleTransactions={visibleTransactions}
            setVisibleTransactions={setVisibleTransactions}
          />
        ))}
      </Accordion>
    </div>
  );
}