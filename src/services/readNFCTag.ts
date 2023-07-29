// import nfcManager, { NfcTech } from "react-native-nfc-manager";

// export async function readNdef() {
//     try {
//         // register for the NFC tag with NDEF in it
//         await nfcManager.requestTechnology(NfcTech.Ndef);
//         // the resolved tag object will contain `ndefMessage` property
//         const tag = await NfcManager.getTag();

//         if (tag) {
//             const payload = tag.ndefMessage[0].payload;
//             const text = String.fromCharCode.apply(null, payload.slice(3));

//             setTagData(text);
//             return text;
//         }
//     } catch (ex) {
//         console.warn('Oops!', ex);
//     } finally {
//         // stop the nfc scanning
//         NfcManager.cancelTechnologyRequest();
//     }
// }
