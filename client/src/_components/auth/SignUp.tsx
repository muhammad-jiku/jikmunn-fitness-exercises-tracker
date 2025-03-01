/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { UserSignUp } from '../../_state/api';
import { loginSuccess } from '../../_state/reducers/userSlice';
import CustomButton from '../shared/CustomButton';
import CustomTextInput from '../shared/CustomTextInput';

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateInputs = () => {
    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return false;
    }
    return true;
  };

  const handelSignUp = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      await UserSignUp({ name, email, password })
        .then((res: { data: any }) => {
          dispatch(loginSuccess(res.data));
          alert('Account Created Success');
          setLoading(false);
          setButtonDisabled(false);
        })
        .catch((err: { response: { data: { message: any } } }) => {
          alert(err.response.data.message);
          setLoading(false);
          setButtonDisabled(false);
        });
    }
  };
  return (
    <Container>
      <div>
        <Title>Create New Account 👋</Title>
        <Span>Please enter details to create a new account</Span>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '20px',
          flexDirection: 'column',
        }}
      >
        <CustomTextInput
          label='Full name'
          placeholder='Enter your full name'
          value={name}
          handelChange={(e: {
            target: { value: React.SetStateAction<string> };
          }) => setName(e.target.value)}
          name={undefined}
          error={undefined}
          textArea={undefined}
          rows={undefined}
          columns={undefined}
          chipableInput={undefined}
          chipableArray={undefined}
          removeChip={undefined}
          height={undefined}
          small={undefined}
          popup={undefined}
          password={undefined}
        />
        <CustomTextInput
          label='Email Address'
          placeholder='Enter your email address'
          value={email}
          handelChange={(e: {
            target: { value: React.SetStateAction<string> };
          }) => setEmail(e.target.value)}
          name={undefined}
          error={undefined}
          textArea={undefined}
          rows={undefined}
          columns={undefined}
          chipableInput={undefined}
          chipableArray={undefined}
          removeChip={undefined}
          height={undefined}
          small={undefined}
          popup={undefined}
          password={undefined}
        />
        <CustomTextInput
          label='Password'
          placeholder='Enter your password'
          password
          value={password}
          handelChange={(e: {
            target: { value: React.SetStateAction<string> };
          }) => setPassword(e.target.value)}
          name={undefined}
          error={undefined}
          textArea={undefined}
          rows={undefined}
          columns={undefined}
          chipableInput={undefined}
          chipableArray={undefined}
          removeChip={undefined}
          height={undefined}
          small={undefined}
          popup={undefined}
        />
        <CustomButton
          text='Sign Up'
          onClick={handelSignUp}
          isLoading={loading}
          isDisabled={buttonDisabled}
          rightIcon={undefined}
          leftIcon={undefined}
          type={undefined}
          flex={undefined}
          small={undefined}
          outlined={undefined}
          full={undefined}
        />
      </div>
    </Container>
  );
};

export default SignUp;
