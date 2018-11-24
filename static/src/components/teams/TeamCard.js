import React from 'react';
import { Col, Image } from 'react-bootstrap';

const TeamCard = ({ name, iconSrc, onClick }) => {
  return (
    <Col lg={4} md={6} sm={6} >
      <div className='card mb-4' onClick={onClick}>
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

export default TeamCard;
