import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import LoadingScreen from './LoadingScreen';

const API_KEY = "AIzaSyACztHZdQNKb4ZaolQ0VG8VAU6q7GLxTo0";
const MODEL_NAME = "gemini-1.5-flash";

const Home = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = React.useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: MODEL_NAME });

            const generationConfig = {
                temperature: 1,
                topP: 0.95,
                topK: 64,
                maxOutputTokens: 12000,
                responseMimeType: "text/plain",
            };

            const chatSession = model.startChat({ generationConfig, history: [] });

            const prompt = `
                Name: ${data.name}
                Starting Place: ${data.StartingPlace}
                Destination: ${data.Destination}
                Duration: ${data.Duration} days
                Budget: Rs${data.budget} 

                Based on the above details, please provide a detailed day-by-day travel itinerary including activities, places to visit, and any recommendations for food and accommodation for each day of the trip.
            `;

            const result = await chatSession.sendMessage(prompt);
            const response = result.response;
            console.log(response.text());
            navigation.navigate('Detail', { response: response.text() });

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <>
                    <Text style={styles.heading}>AI Travel Itinerary Generator</Text>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Name"
                                placeholderTextColor="gray"
                            />
                        )}
                        name="name"
                    />
                    {errors.name && <Text style={styles.error}>This is required.</Text>}

                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Starting Place"
                                placeholderTextColor="gray"
                            />
                        )}
                        name="StartingPlace"
                    />
                    {errors.StartingPlace && <Text style={styles.error}>This is required.</Text>}

                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Destination"
                                placeholderTextColor="gray"
                            />
                        )}
                        name="Destination"
                    />
                    {errors.Destination && <Text style={styles.error}>This is required.</Text>}

                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Duration in days"
                                placeholderTextColor="gray"
                                keyboardType="numeric"
                            />
                        )}
                        name="Duration"
                    />
                    {errors.Duration && <Text style={styles.error}>This is required.</Text>}

                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Budget in Rupees"
                                placeholderTextColor="gray"
                                keyboardType="numeric"
                            />
                        )}
                        name="budget"
                    />
                    {errors.budget && <Text style={styles.error}>This is required.</Text>}

                    <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 50,
        color: 'white',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'white',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
