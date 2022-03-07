import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = (key, defaultValue) => {
    const [storageValue, setStorageValue] = useState(defaultValue);
    const [updated, setUpdated] = useState(false);

    async function getStorageValue() {
        let value = defaultValue;
        try {
            const stored = await AsyncStorage.getItem(key);
            value = JSON.parse(stored) || defaultValue;
        } catch (e) {
        } finally {
            setStorageValue(value);
        }
    }

    async function updateStorage(newValue) {
        try {
            if (newValue === null) {
                await AsyncStorage.removeItem(key);
            } else {
                const value = JSON.stringify(newValue);
                await AsyncStorage.setItem(key, value);
            }
        } catch (e) {
        } finally {
            setUpdated(!updated);
        }
    }

    useEffect(() => {
        getStorageValue();
    }, [updated]);

    return [storageValue, updateStorage];
};

export default useAsyncStorage;