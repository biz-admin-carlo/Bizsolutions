import React from 'react';
import { Card } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

const BusinessCardSkeleton = () => (
  <Card className="my-3" data-aos="fade-up">
    <div className='business-card-div'>
      <div className='image-container-skeleton'>
        <Skeleton width={'100%'} height={150} />
      </div>
      <Card.Body>
        <Card.Title>
          <Skeleton width={'80%'} />
        </Card.Title>
        <Skeleton width={'60%'} />
        <Card.Subtitle className="mb-2">
          <Skeleton width={'70%'} />
        </Card.Subtitle>

        <div className='rating-row-skeleton'>
          <Skeleton width={'50%'} />
        </div>

        <div className='badge-row-skeleton'>
          <Skeleton width={'60%'} />
        </div>

        <div className='badges-container-skeleton'>
          <Skeleton width={'30%'} />
          <Skeleton width={'30%'} />
          <Skeleton width={'30%'} />
        </div>

        <Card.Subtitle className="my-2 text-secondary">
          <Skeleton width={'90%'} />
        </Card.Subtitle>
      </Card.Body>

      <div className="map-container-skeleton">
        <Skeleton width={'100%'} height={200} />
      </div>
    </div>
  </Card>
);

export default BusinessCardSkeleton;