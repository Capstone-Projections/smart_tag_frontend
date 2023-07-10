import { useEffect, useState } from 'react';
import NfcManager, { NfcTech, NfcEvents } from 'react-native-nfc-manager';

// Pre-step, call this before any NFC operations
NfcManager.start();

const useNfcTagReader = () => {
    const [tagData, setTagData] = useState<null | string>(null);

    useEffect(() => {
        const readNfcTag = async () => {
            try {
                // Register for the NFC tag with NDEF in it
                await NfcManager.requestTechnology(NfcTech.Ndef);
                // The resolved tag object will contain the `ndefMessage` property
                const tag = await NfcManager.getTag();

                if (tag && tag.ndefMessage && tag.ndefMessage.length > 0) {
                    const payload = tag.ndefMessage[0].payload;
                    const text = String.fromCharCode.apply(
                        null,
                        payload.slice(3)
                    );

                    setTagData(text);
                }
            } catch (ex) {
                console.warn('Oops!', ex);
            } finally {
                // Stop the NFC scanning
                NfcManager.cancelTechnologyRequest();
            }
        };

        // Add an NFC listener when the component mounts
        NfcManager.setEventListener(NfcEvents.DiscoverTag, readNfcTag);

        // Clean up the NFC listener when the component unmounts
        return () => {
            NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        };
    }, []);

    return tagData;
};

export default useNfcTagReader;
