import React from 'react';
import PropTypes from 'prop-types';

import { FLAG_URL } from 'containers/MainPage/constants';

import Wrapper from './styled/Wrapper';
import City from './styled/City';
import Flag from './styled/Flag';

function CityPreview({
  city,
  updateField,
  updateCityId,
  getVatDetails,
}) {

  const { id, name, sys} = city;
  return (
    <Wrapper
      onClick={() => {
        updateField('city', `${name}, ${sys.country}`);
        updateCityId(id);
        if (getVatDetails) {
          getVatDetails(id);
        }
      }}
    >
      <City>
        {name}, {sys.country}
      </City>
      <Flag
        src={`${FLAG_URL}/${sys.country.toLowerCase()}.png`}
        alt="country flag"
      />
    </Wrapper>
  );
}

CityPreview.propTypes = {
  city: PropTypes.shape({
    name: PropTypes.string,
    sys: PropTypes.shape({
      country: PropTypes.string,
    }),
  }),
  updateField: PropTypes.func,
  updateCityId: PropTypes.func,
  getVatDetails: PropTypes.func,
};


export default CityPreview;