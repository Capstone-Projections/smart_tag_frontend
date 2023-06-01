import { Button } from '../../../components/general/Button/AppButton';
import { Entry } from '../../../components/general/Entry/AppEntry';
import { Text } from '../../../components/general/Text/AppText';
import { Container, SignInWrapper } from './styles';

export const SignInScreen = () => {
  return (
    <Container>
      <Text style={{ textAlign: 'center' }}>
        Enter your E-mail and password to continue
      </Text>

      <SignInWrapper>
        <Text type="ustudent" style={{ textAlign: 'left' }}>
          E-mail or Phone Number
        </Text>
        <Entry placeholder="E-mail" />
        <Text type="ustudent" style={{ textAlign: 'left' }}>
          Password
        </Text>
        <Entry placeholder="Password" />
        <Button text="Continue" type="status" textColor="white" />
        <Text type="ustudent">Sign In?</Text>
      </SignInWrapper>
    </Container>
  );
};

export default SignInScreen;
