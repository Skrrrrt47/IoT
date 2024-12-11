import React from 'react';

const StatBox = ({ icon, title, value } : {icon: string,title: string, value: string | number}) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 items-center text-center min-w-40">
      <img className="w-10 h-10" src={icon} />
      <h3 className="text-lg font-semibold">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );
};

export default StatBox;
