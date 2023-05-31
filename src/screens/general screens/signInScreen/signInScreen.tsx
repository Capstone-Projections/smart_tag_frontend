import { Button } from '../../../components/general/Button';
import { Text } from '../../../components/general/Text';
import { Container, SignInWrapper } from './styles';
import { Entry } from '../../../components/general/Entry/AppEntry';
import { TouchableOpacity } from 'react-native';

export const SignInScreen = () => {
  return (
    <Container>
      <Text>Enter your E-mail and password to continue</Text>

      <SignInWrapper>
        <Text type="ustudent">E-mail or Phone Number</Text>
        <Entry placeholder="E-mail" />
        <Text type="ustudent">Password</Text>
        <Entry placeholder="Password" />
        <Button text="Continue" type="status" textColor="white" />
        <Text type="ustudent">Sign Up?</Text>
      </SignInWrapper>
    </Container>
  );
};

export default SignInScreen;
