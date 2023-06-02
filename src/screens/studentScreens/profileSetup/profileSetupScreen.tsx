import { View, StyleSheet } from 'react-native';
import { Button } from '../../../components/general/Button/AppButton';
import { Entry } from '../../../components/general/Entry/AppEntry';
import { Text } from '../../../components/general/Text/AppText';
import { Container, SetUpWrapper } from './styles';

export const ProfileSetupScreen = () => {
  return (
    <Container>
      <SetUpWrapper>
        <Text type="ustudent" style={{ textAlign: 'center' }}>
          Kindly setup to get started with Smart Tag
        </Text>
        <Text type="ustudent" style={{ textAlign: 'left' }}>
          Name
        </Text>
        <Entry></Entry>
        <Text type="ustudent" style={{ textAlign: 'left' }}>
          Index Number
        </Text>
        <Entry></Entry>
        <Text>Year</Text>
        <Entry></Entry>
      </SetUpWrapper>
    </Container>
  );
};

export default ProfileSetupScreen;
