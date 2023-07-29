import { StyleProp, ViewStyle } from 'react-native';

export interface BarcodeScannerProps {
    boxSize: number;
    // boxPosition: {
    //     top: string;
    //     left: string;
    //     transform: StyleProp<ViewStyle>[];
    // };

    onQRCodeScanned: (data: string) => void;
}
