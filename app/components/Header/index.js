/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import DynamicInputField from 'components/DynamicInputField';
import CenteringContainer from 'components/01-ui/CenteringContainer';

import Wrapper from './styled/Wrapper';
import LogoH1 from './styled/LogoH1';
import LeftColumn from './styled/LeftColumn';

function Header({
  fields,
  searched,
  fetching,
  cityId,
  updateField,
  updateDynamicField,
  updateCityId,
  getVatDetails,
}) {
  return (
    <Wrapper>
      <CenteringContainer>
        <LeftColumn>
          <Link to="/welcome">
            <LogoH1>ERPLY</LogoH1>
          </Link>
        </LeftColumn>
        <DynamicInputField
          name="city"
          value={fields.city}
          searched={searched}
          fetching={fetching}
          cityId={cityId}
          updateField={updateField}
          updateDynamicField={updateDynamicField}
          updateCityId={updateCityId}
          getVatDetails={getVatDetails}
        />
      </CenteringContainer>
    </Wrapper>
  );
}

Header.propTypes = {
  fields: PropTypes.shape({
    VATnumber: PropTypes.string,
    city: PropTypes.string,
  }),
  searched: PropTypes.array,
  fetching: PropTypes.bool,
  cityId: PropTypes.number,
  updateField: PropTypes.func,
  updateDynamicField: PropTypes.func,
  updateCityId: PropTypes.func,
  getVatDetails: PropTypes.func,
};

export default Header;
