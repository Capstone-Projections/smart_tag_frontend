import { Button } from '../../components/general/Button/AppButton';
import { Entry } from '../../components/general/Entry/AppEntry';
import { Text } from '../../components/general/Text/AppText';
import { Container, SignUpWrapper } from './styles';
import { AppButtonProps } from './../../components/general/Button/AppButton.prop';

export const SignUpScreen = () => {
  return (
    <Container>
      <Text style={{ textAlign: 'center' }}>
        Enter your E-mail and password to continue
      </Text>

      <SignUpWrapper>
        <Text type="ustudent" style={{ textAlign: 'left' }}>
          E-mail or Phone Number
        </Text>
        <Entry placeholder="E-mail" />
        <Text type="ustudent" style={{ textAlign: 'left' }}>
          Password
        </Text>
        <Entry placeholder="Password"/>
        <Button text="Continue"/>
        <Text type="ustudent">Sign Up?</Text>
      </SignUpWrapper>
    </Container>
  );
};

export default SignUpScreen;
