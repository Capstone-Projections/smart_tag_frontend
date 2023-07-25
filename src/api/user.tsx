import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const login = async (email: string) => {
    try {
        const response = await axios.post(
            'https://smart-tag.onrender.com/login',
            {
                email,
            }
        );
        if (response.data.success) {
            const token = response.data.token;
            await AsyncStorage.setItem('token', token);
        }
        return response;
    } catch (error) {
        console.log('error');
    }
};
