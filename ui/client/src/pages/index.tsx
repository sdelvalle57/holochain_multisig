import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import Dashboard from './dashboard';
import { PageContainer } from '../components';

export default function Pages() {
  return (
    <Fragment>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Dashboard path="/" />
        </Router>
      </PageContainer>
    </Fragment>
  );
}
