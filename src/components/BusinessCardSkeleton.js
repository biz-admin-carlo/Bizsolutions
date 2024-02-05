import React from 'react';
import { Card } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

const BusinessCardSkeleton = () => (
  <Card className="my-3" data-aos="fade-up">
    <div className='business-card-div'>
      <div style={{ marginRight: 10 }}>
        <Skeleton width={150} height={150} />
      </div>
      <Card.Body>
        <Card.Title>
          <Skeleton width={200} />
        </Card.Title>
        <Skeleton width={100} />
        <Card.Subtitle className="mb-2">
          <Skeleton width={150} />
        </Card.Subtitle>

        <div className='text-center-sm'>
          <Card.Subtitle className="mb-2 me-2 text-muted custom-inline">
            <Skeleton width={200} />
          </Card.Subtitle>

          {/* Repeat for other subtitles */}
          <Card.Subtitle className="mb-2 text-muted custom-inline">
            <Skeleton width={100} />
          </Card.Subtitle>
        </div>

        <Card.Subtitle className="my-2 text-secondary">
          <Skeleton width={250} />
        </Card.Subtitle>
      </Card.Body>

      {/* Placeholder for MapContainer */}
      <div className="map-container">
        <Skeleton width={'100%'} height={200} />
      </div>
    </div>
  </Card>
);

export default BusinessCardSkeleton;