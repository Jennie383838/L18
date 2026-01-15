import React, { useState, useEffect } from 'react';
import {
    FlatList,
    StatusBar,
    Text,
    TextInput,
    View,
    Image,
    StyleSheet
} from 'react-native';

let originalData = [];

const App = () => {
    const [myData, setMyData] = useState([]);

    useEffect(() => {
        const myurl = "https://kpopidolwebservice.onrender.com/kpopidols";
        fetch(myurl)
            .then((response) => response.json())
            .then((myJson) => {
                setMyData(myJson);
                originalData = myJson;
            })
            .catch((error) => console.error(error));
    }, []);

    const FilterData = (text) => {
        if (text !== '') {
            const myFilteredData = originalData.filter((item) =>
                item.idol_name.toLowerCase().includes(text.toLowerCase())
            );
            setMyData(myFilteredData);
        } else {
            setMyData(originalData);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.cardContainer}>
            <Text style={styles.cardName}>{item.idol_name}</Text>
            <Image
                source={{ uri: item.idol_pic }}
                style={styles.cardImage}
                resizeMode="cover"
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <Text style={styles.label}>Search:</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Type Idolname..."
                placeholderTextColor="#999"
                onChangeText={(text) => FilterData(text)}
            />

            <FlatList
                data={myData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: 30 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: '#F6F7FB',
        flex: 1,
    },
    label: {
        fontWeight: '600',
        marginBottom: 6,
        fontSize: 16,
        color: '#444',
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
    },
    cardContainer: {
        borderRadius: 16,
        padding: 14,
        marginBottom: 16,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    cardName: {
        fontWeight: '700',
        fontSize: 18,
        color: '#6A5ACD',
        marginBottom: 10,
    },
    cardImage: {
        width: '100%',     // FULL WIDTH
        height: 320,       // BIGGER IMAGE
        borderRadius: 14,
        backgroundColor: '#EEE',
    },
});

export default App;
