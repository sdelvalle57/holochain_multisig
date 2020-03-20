import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { RouteComponentProps } from '@reach/router';
import { myAddress } from './__generated__/myAddress';

const GET_MY_ADDRESS = gql`
  query myAddress {
    myAddress {
      myAddress
    }
  }
`;

interface DashboardProps extends RouteComponentProps {

}

const Dashboard: React.FC<DashboardProps> = () => {
  const { 
    data, 
    loading, 
    error
  } = useQuery<
  myAddress
  >(GET_MY_ADDRESS);

  
  if (loading) return <p>LOADING</p>;
  if (error || !data) return <p>ERROR</p>;
  return (
    <Fragment>{data.myAddress ? data.myAddress.myAddress : "No Address"}</Fragment>
  )
}

export default Dashboard;
