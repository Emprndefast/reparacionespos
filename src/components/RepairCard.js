import React from 'react';
const RepairCard = ({ repair }) => (
  <div className='card'>
    <h3>{repair.device}</h3>
    <p>{repair.problem}</p>
    <p>Status: {repair.status}</p>
  </div>
);
export default RepairCard;