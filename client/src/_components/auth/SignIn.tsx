import { SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { UserSignIn } from '../../_state/api';
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

const SignIn = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateInputs = () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return false;
    }
    return true;
  };

  const handelSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      await UserSignIn({ email, password })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          alert('Login Success');
          setLoading(false);
          setButtonDisabled(false);
        })
        .catch((err) => {
          alert(err.response.data.message);
          setLoading(false);
          setButtonDisabled(false);
        });
    }
  };

  return (
    <Container>
      <div>
        <Title>Welcome to Fitness Exercise Tracker 👋</Title>
        <Span>Please login with your details here</Span>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '20px',
          flexDirection: 'column',
        }}
      >
        <CustomTextInput
          label='Email Address'
          placeholder='Enter your email address'
          value={email}
          handelChange={(e: { target: { value: SetStateAction<string> } }) =>
            setEmail(e.target.value)
          }
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
          handelChange={(e: { target: { value: SetStateAction<string> } }) =>
            setPassword(e.target.value)
          }
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
          text='Sign In'
          onClick={handelSignIn}
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

export default SignIn;
