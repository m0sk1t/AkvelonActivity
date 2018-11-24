import React from 'react';
import { Col, Image } from 'react-bootstrap';

const AchievementCard = ({ name, iconSrc}) => {
  return (
    <Col lg={2} md={2} sm={2} >
      <div className='card mb-2'>
        <Image
          className='card-img-top'
          alt={name}
          src={iconSrc}
        />
        <div className='card-body'>
          <h5 className='card-title'>{name}</h5>
        </div>
      </div>
    </Col>
  );
};

export default AchievementCard;
