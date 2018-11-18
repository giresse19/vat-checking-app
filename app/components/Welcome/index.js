/**
 *
 * Welcome
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import InputField from 'components/InputField';
import DynamicInputField from 'components/DynamicInputField';
import Button from 'components/01-ui/Button';
import CenteringContainer from 'components/01-ui/CenteringContainer';

import Wrapper from './styled/Wrapper';
import Title from './styled/Title';
import Instructions from './styled/Instructions';
import Fields from './styled/Fields';
import NestedLink from './styled/NestedLink';

function Welcome({
  fields,
  searched,
  fetching,
  cityId,
  updateField,
  updateDynamicField,
  updateCityId,
  historyPush,
}) {
  const { VATnumber, city } = fields;
  return (
    <Wrapper>
      <CenteringContainer maxWidth="700">
        <Title>VAT Validation App</Title>
        <Instructions>
          <p>
            This is a VAT validation application
            with VAT number checked based off Erply API(Endpoint).
            The App also uses the OpenWeatherMap API for 
            dynamic city Search. The City Search anables users
            to choose a city in the country where the enterprise 
            who{'s'} VAT is being checked is located, for better user experience.
          </p>
          <p>
            The dynamic search provided by OpenWeatherMap can be checked here{' '}
            <NestedLink href="https://openweathermap.org/find">
              (external link)
            </NestedLink>{' '}
          </p>
          <p>
            Try typing the full name of the city, where the company is located.
          </p>
        </Instructions>
        <Fields>
        
        <DynamicInputField
            name="city"
            value={city}
            searched={searched}
            fetching={fetching}
            cityId={cityId}
            updateField={updateField}
            updateDynamicField={updateDynamicField}
            updateCityId={updateCityId}
          />
          
        <InputField
            name="VATnumber"
            value={VATnumber}
            updateField={updateField}
          />   

          <Button
            text="Search"  
            onClick={() => {
              if (VATnumber && city && cityId) {             
                historyPush('/vatdetails');
              } else if (VATnumber && city) {
                alert('Please, choose the city from the dropdown.');
              } else {
                alert('Please, fill out all the fields.');
              }
            }}
          />
        </Fields>
      </CenteringContainer>
    </Wrapper>
  );
}

Welcome.propTypes = {
  fields: PropTypes.shape({
    VATnumber: PropTypes.string,
    city: PropTypes.string,
  }),
  cityId: PropTypes.number,
  fetching: PropTypes.bool,
  searched: PropTypes.array,
  updateField: PropTypes.func,
  updateDynamicField: PropTypes.func,
  updateCityId: PropTypes.func,
  historyPush: PropTypes.func,
};

export default Welcome;
