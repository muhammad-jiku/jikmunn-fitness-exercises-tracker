/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { UserSignIn } from '../../_state/api';
import { signinSuccess } from '../../_state/reducers/userSlice';
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

const SignIn = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const validateInputs = () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (!validateInputs()) {
      setLoading(false);
      setButtonDisabled(false);
      return;
    }
    try {
      const res = await UserSignIn({ email, password });
      // Dispatching signinSuccess action with the full response payload.
      // Expected res.data: { user, accessToken, refreshToken }
      dispatch(signinSuccess(res));
      alert('Sign in successful!');
    } catch (err: any) {
      alert(err.response.data.message);
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Welcome to Fitness Exercise Tracker 👋</Title>
        <Span>Please sign in with your details here</Span>
      </div>
      <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
        <CustomTextInput
          label='Email Address'
          placeholder='Enter your email address'
          value={email}
          handelChange={(e: { target: { value: string } }) =>
            setEmail(e.target.value)
          }
        />
        <CustomTextInput
          label='Password'
          placeholder='Enter your password'
          password
          value={password}
          handelChange={(e: { target: { value: string } }) =>
            setPassword(e.target.value)
          }
        />
        <CustomButton
          text='Sign In'
          onClick={handleSignIn}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

export default SignIn;
