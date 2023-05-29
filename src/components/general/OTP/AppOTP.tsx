import { Entry } from '../Entry/AppEntry';
import { AppEntryProps } from '../Entry/AppEntry.prop';
import { HStack } from 'native-base';

export const OTP = ({ type }: AppEntryProps) => (
  <HStack space={3} justifyContent="center">
    <Entry type="otp"></Entry>
  </HStack>
);
