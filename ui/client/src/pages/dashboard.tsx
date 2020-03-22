import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { RouteComponentProps } from '@reach/router';
import { MyAddress } from '../__generated__/MyAddress';

import {Container} from '../components/container';
import CreateMultisigContainer from './create-multisig';

import {GET_MY_ADDRESS} from '../queries';

interface DashboardProps extends RouteComponentProps {
}

const Dashboard: React.FC<DashboardProps> = () => {

  const { 
    data, 
    loading, 
    error
  } = useQuery<
  MyAddress
  >(GET_MY_ADDRESS);

  
  if (loading) return <p>LOADING</p>;
  if (error || !data) return <p>ERROR</p>;
  return (
    <Fragment>
      <Container>
        <Container>
          <h1>Holochain Multisig Dashboard</h1><br/>
          <p>
            <h4>My Address: {data.myAddress ? data.myAddress.myAddress : "No Address"}</h4>
          </p>
          </Container>
          <CreateMultisigContainer />
          
      </Container>
      </Fragment>
  )
}

export default Dashboard;
