import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';

export default function SearchComponent() {
    const [search, setSearch] = useState('');

    return (
        <Searchbar style={styles.SearchBar}
            placeholder="Search..."
            onChangeText={setSearch}
            value={search}
        />
    );
}

const styles = {
    SearchBar: {
        marginTop: 10,
    },
};
