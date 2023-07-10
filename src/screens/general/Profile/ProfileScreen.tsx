import { Text, View, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { useEffect, useContext, useState } from 'react';
import { Avatar, TouchableRipple, Caption, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { useQuery } from 'react-query';

const ProfileScreen = () => {
    const { email, userID, authorizationKey } = useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(true);
    const [indexNumber, setIndexNumber] = useState('');
    const [referenceNumber, setReferenceNumber] = useState('');

    const { data, isLoading, isError } = useQuery(['userData', userID], () =>
        axios
            .get(`https://smart-tag.onrender.com/users/${userID}`, {
                headers: { Authorization: authorizationKey },
            })
            .then(response => response.data)
    );

    useEffect(() => {
        if (data) {
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setIndexNumber(data.indexNumber);
            setReferenceNumber(data.referenceNumber);
        }
    }, [data]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image
                        source={require('../../../../assets/images/user.png')}
                        size={80}
                    />
                    <View style={{ marginLeft: 5 }}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color="blue" />
                        ) : isError ? (
                            <Text>Error loading user data</Text>
                        ) : (
                            <>
                                <Title style={styles.title}>
                                    {firstName} {lastName}
                                </Title>
                                <Caption style={styles.caption}>
                                    {email}
                                </Caption>
                            </>
                        )}
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="book-open-variant" size={20} />
                    <Text style={{ marginLeft: 5 }}>Computer Engineering</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="credit-card" size={20} />
                    <Text style={{ marginLeft: 5 }}>{indexNumber}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="card-account-details-outline" size={20} />
                    <Text style={{ marginLeft: 5 }}>{referenceNumber}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;
