import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import { RouteComponentProps } from '@reach/router';

import Dashboard from './dashboard';
import { PageContainer } from '../components';
import {CreateMultisig_createMultisig} from './__generated__/CreateMultisig';
import  Created  from './created';

interface DashboardProps extends RouteComponentProps {
  created: CreateMultisig_createMultisig | null;
}

const Pages: React.FC<DashboardProps> = ({created}) => {
  console.log("createds", created)
  return (
    <Fragment>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Created path='created' />
          {/* {created ? <Created created={created} path='created' />: <Dashboard path="/" />} */}
          
        </Router>
      </PageContainer>
    </Fragment>
  );
}

export default Pages;
