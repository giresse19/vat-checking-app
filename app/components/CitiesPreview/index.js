/**
 *
 * CitiesPreview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import CityPreview from 'components/CityPreview';
import Loading from 'components/01-ui/Loading';

import CityPreviewWrapper from 'components/CityPreview/styled/Wrapper';

import Wrapper from './styled/Wrapper';

function CitiesPreview({
  searched,
  fetching,
  cityId,
  updateField,
  updateCityId,
  getVatDetails,
}) {
  if (!fetching) {
    if (searched.length && !cityId) {
      return (
        <Wrapper>
          {searched.map(city => (
            <CityPreview
              key={city.id}
              city={city}
              updateField={updateField}
              updateCityId={updateCityId}
              getVatDetails={getVatDetails}
            />
          ))}
        </Wrapper>
      );
    } else if (!cityId) {
      return (
        <Wrapper>
          <CityPreviewWrapper>Nothing was found.</CityPreviewWrapper>
        </Wrapper>
      );
    }
  } else {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }
  return null;
}

CitiesPreview.propTypes = {
  searched: PropTypes.array,
  fetching: PropTypes.bool,
  cityId: PropTypes.number,
  updateField: PropTypes.func,
  updateCityId: PropTypes.func,
  getVatDetails: PropTypes.func,
};

export default CitiesPreview;
