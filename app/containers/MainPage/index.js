/**
 *
 * MainPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';

import Welcome from 'components/Welcome';
import VatDetails from 'components/VatDetails';

import injectSaga from 'utils/injectSaga';
import makeSelectMainPage from './selectors';
import saga from './saga';

import {
  findCity,
  getVatDetails,
  updateField,
  updateTimer,
  updateCityId,
} from './actions';

export class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.updateDynamicField = this.updateDynamicField.bind(this);
  }

  updateDynamicField(fieldName, query) {
    const { timer } = this.props.mainPage;

    this.props.updateField(fieldName, query);

    clearInterval(timer);

    this.props.updateTimer(
      setTimeout(() => {
        if (query.length > 1) {
          this.props.findCity(query);
        }
      }, 500),
    );
  }

  render() {
    const {
      fields,
      searched,
      fetching,
      cityId,
      vatDetails,
    } = this.props.mainPage;
    return (
      <Switch>
        <Redirect exact from="/" to="/welcome" />
        <Route
          path="/welcome"
          render={props => (
            <Welcome
              fields={fields}
              searched={searched}
              fetching={fetching}
              cityId={cityId}
              updateField={this.props.updateField}
              updateDynamicField={this.updateDynamicField}
              updateCityId={this.props.updateCityId}
              historyPush={this.props.history.push}
              {...props}
            />
          )}
        />
        <Route
          path="/vatdetails"
          render={props => (
            <VatDetails
              vatDetails={vatDetails}
              cityId={cityId}
              fields={fields}
              searched={searched}
              fetching={fetching}
              updateField={this.props.updateField}
              updateDynamicField={this.updateDynamicField}
              updateCityId={this.props.updateCityId}
              getVatDetails={this.props.getVatDetails}
              {...props}
            />
          )}
        />
      </Switch>
    );
  }
}

MainPage.propTypes = {
  mainPage: PropTypes.shape({
    fields: PropTypes.shape({
      VATnumber: PropTypes.string,
      city: PropTypes.string,
    }),
    fetching: PropTypes.bool,
    searched: PropTypes.array,
    timer: PropTypes.number,
    cityId: PropTypes.number,
    vatDetails: PropTypes.object,
  }),
  findCity: PropTypes.func,
  getVatDetails: PropTypes.func,
  updateField: PropTypes.func,
  updateTimer: PropTypes.func,
  updateCityId: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

const mapStateToProps = createStructuredSelector({
  mainPage: makeSelectMainPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    findCity: query => dispatch(findCity(query)),
    getVatDetails: fieldName => dispatch(getVatDetails(fieldName)),
    updateField: (fieldName, query) =>
      dispatch(updateField(fieldName, query)),
    updateTimer: timer => dispatch(updateTimer(timer)),
    updateCityId: id => dispatch(updateCityId(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'mainPage', saga });

export default withRouter(
  compose(
    withSaga,
    withConnect,
  )(MainPage),
);
