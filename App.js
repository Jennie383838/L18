import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, Image, StyleSheet } from 'react-native';

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
                resizeMode="contain"
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
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: '#F6F7FB',   // soft pastel background
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
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,                // Android shadow
    },
    cardName: {
        flex: 1,
        fontWeight: '700',
        fontSize: 16,
        color: '#6A5ACD',             // soft purple accent
    },
    cardImage: {
        width: 140,
        height: 200,
        marginLeft: 15,
        borderRadius: 10,
        backgroundColor: '#F2F2F2',
    },
});

export default App;
