/**
 *
 * VatDetails
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import Loading from 'components/01-ui/Loading';
import CenteringContainer from 'components/01-ui/CenteringContainer';
import Button from 'components/01-ui/Button';

import Description from './styled/Description';
import Address from './styled/Address';
import Wrapper from './styled/Wrapper';
import Head from './styled/Head';
import BodyWrap from './styled/BodyWrap';
import Name from './styled/Name';
import VatNumber from './styled/VatNumber';
import MainWrap from './styled/MainWrap';
// import PreviewWrapper from './styled/CityPreviewWrapper';

class VatDetails extends React.Component {
  componentDidMount() {
    if (this.props.fields.VATnumber) {
      this.props.getVatDetails(this.props.fields.VATnumber);
    } else {
      this.props.history.push('/welcome');
    }
  }

  render() {
    const { vatData } = this.props.vatDetails;
    const {
      fields,
      searched,
      fetching,
      cityId,
      updateField,
      updateDynamicField,
      updateCityId,
      getVatDetails,
    } = this.props;
    if (vatData) {
      return (
        <MainWrap>
          <CenteringContainer>
            <Wrapper>
              <Header
                fields={fields}
                searched={searched}
                fetching={fetching}
                cityId={cityId}
                updateField={updateField}
                updateDynamicField={updateDynamicField}
                updateCityId={updateCityId}
                getVatDetails={getVatDetails}
              />
              {vatData.Valid ? (
                <Head> Yes, the VAT number is Valid.</Head>
              ) : (
                <Head>
                  {' '}
                  Invalid VAT number, Please check and try again.
                </Head>
              )}
              <BodyWrap>
                <Address>
                  Country Code : {vatData.CountryCode}
                </Address>
                <Description>
                  {' '}
                  Request Date : {vatData.RequestDate}{' '}
                </Description>
                <Address> Address : {vatData.Address}</Address>
                <Name> Name : {vatData.Name}</Name>
                <VatNumber>
                  VAT number : {vatData.VATNumber}
                </VatNumber>
                {vatData.Valid ? (
                  <Name> Valid : {'true'}</Name>
                ) : (
                  <Name> Valid : {'false'}</Name>
                )}
              </BodyWrap>
            </Wrapper>
            <Button
              text="Back"
              onClick={() => {
                this.props.history.push('/welcome');
              }}
            />
          </CenteringContainer>
        </MainWrap>
      );
    }
    return <Loading />;
  }
}

VatDetails.propTypes = {
  vatDetails: PropTypes.shape({
    vatData: PropTypes.object,
  }),
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default VatDetails;
