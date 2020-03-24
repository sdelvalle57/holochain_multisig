import React, { Component } from 'react';
import styled, { css, keyframes } from 'react-emotion';
import { size, lighten } from 'polished';

import {Button, Loading, Error} from '.';
import { StyledForm, StyledInput} from './global-containers'
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as Reload } from '../assets/reload.svg';
import { colors, unit } from '../styles';
import { CreateMultisigVariables } from '../__generated__/CreateMultisig';
import { ApolloError } from 'apollo-client';

interface LoginFormProps {
  createMultisig: (a: { variables: CreateMultisigVariables }) => void;
  error: ApolloError | undefined;
  loading: boolean ;
}

interface LoginFormState {
  title: string;
  description: string;
  error: boolean;
}

export default class LoginForm extends Component<LoginFormProps, LoginFormState> {
  state = { 
    title: '', 
    description: '',
    error: this.props.error !== undefined
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = (event.target as HTMLInputElement).name ;
    const value = (event.target as HTMLInputElement).value;
   
    this.setState(s => ({ ...this.state, [name]: value } as Pick<LoginFormState, keyof LoginFormState>));
  };

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.createMultisig({ variables: { title: this.state.title, description: this.state.description } });
  };

  componentWillReceiveProps = ({error}: {error: ApolloError | undefined}) => {
    this.setState(s => ({error: error !== undefined}))
  }

  renderReload = () => {
    const {error} = this.props;
    if(this.state.error && error) {
      return(
        <StyledReload onClick={() => this.setState({error: false})} />
      )
    }
    return null;
  }

  renderForm = () => {
    return (
      <StyledForm onSubmit={(e) => this.onSubmit(e)}>
        <StyledInput
          required
          name="title"
          placeholder="Title"
          onChange={(e) => this.onChange(e)}  />
        <StyledInput
          required
          name="description"
          placeholder="Description"
          onChange={(e) => this.onChange(e)} />
        <Button type="submit">Create Multisig</Button>
      </StyledForm>
    )
  }

  renderContent = () => {
    const {loading, error} = this.props;
    if(loading) {
      return <Loading />
    } else if(this.state.error && error) {
      return <Error error = {error} />
    } else {
      return this.renderForm()
    }
  }

  render() {
    return (
      <Container>
        <Header>
          
        </Header>
        <StyledLogo />
        <Heading>Create New Multisig</Heading>
        {this.renderContent()}
        {this.renderReload()}
      </Container>
    );
  }
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexGrow: 1,
  paddingBottom: unit * 6,
  color: 'white',
  backgroundColor: colors.primary,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '38em'
});

const svgClassName = css({
  display: 'block',
  fill: 'currentColor',
});

const Header = styled('header')(svgClassName, {
  width: '100%',
  marginBottom: unit * 5,
  padding: unit * 2.5,
  position: 'relative',
});

const StyledLogo = styled(Logo)(size(56), {
  display: 'block',
  margin: '0 auto',
  position: 'relative',
});

const spin = keyframes`
  from {
    transform: rotate(360deg);
  }
`;

const StyledReload = styled(Reload)(size(36), {
  display: 'block',
  margin: '1em auto',
  position: 'relative',
  cursor: 'pointer',
  outline: 'none',
  ':hover': {
    backgroundColor: lighten(0.1, colors.primary),
    animation: `${spin} 1s linear infinite`,
  },
});

const Heading = styled('h1')({
  margin: `${unit * 3}px 0 ${unit * 6}px`,
});


