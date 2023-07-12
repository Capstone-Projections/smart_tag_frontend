import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

// Pre-step, call this before any NFC operations
NfcManager.start();

function NFCScreen() {
    const [tagData, setTagData] = useState('');

    async function readNdef() {
        try {
            // register for the NFC tag with NDEF in it
            await NfcManager.requestTechnology(NfcTech.Ndef);
            // the resolved tag object will contain `ndefMessage` property
            const tag = await NfcManager.getTag();

            if (tag) {
                const payload = tag.ndefMessage[0].payload;
                const text = String.fromCharCode.apply(null, payload.slice(3));

                setTagData(text);
            }
        } catch (ex) {
            console.warn('Oops!', ex);
        } finally {
            // stop the nfc scanning
            NfcManager.cancelTechnologyRequest();
        }
    }

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={readNdef}>
                <Text>Scan a Tag</Text>
            </TouchableOpacity>

            {tagData && (
                <View style={styles.tagContainer}>
                    <Text style={styles.tagText}>Tag found:</Text>
                    <Text style={styles.tagText}>
                        {JSON.stringify(tagData)}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    tagText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default NFCScreen;
