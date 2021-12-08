import React from 'react';
import PropTypes from 'prop-types';

function ServiceList(props) {
  const { latitude, longitude, serviceType } = props;

  return <div></div>;
}

ServiceList.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  serviceType: PropTypes.string,
};

export default ServiceList;
