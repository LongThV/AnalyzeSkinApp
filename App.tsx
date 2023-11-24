/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react'
import type { PropsWithChildren } from 'react'
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'

import ImagePicker from 'react-native-image-crop-picker'

function App(): JSX.Element {
    const [imageUrl, setImageUrl] = useState<any>({})
    const [analysisContent, setAnalysisContent] = useState({})

    const handleAnalyzeImg = async () => {
        const imageData = {
            uri: imageUrl?.path,
            type: 'multipart/form-data',
            name: imageUrl?.filename || Math.floor(Math.random() * Math.floor(999999999)) + '.jpg'
        }

        const url = 'https://skin-analysis.p.rapidapi.com/face/effect/skin_analyze'
        const data = new FormData()
        data.append('image', imageData)
        // data.append('max_face_num', '5')
        // data.append('face_field', 'color,smooth,acnespotmole')

        const options = {
            method: 'POST',
            headers: {
                'X-RapidAPI-Key': 'qq',
                'X-RapidAPI-Host': 'skin-analysis.p.rapidapi.com'
            },
            body: data
        }

        try {
            const response = await fetch(url, options)
            const result = await response.text()
            console.log('result::', result)
            setAnalysisContent(JSON.parse(result))
        } catch (error) {
            console.error(error)
        }
    }

    const openCamera = () => {
        ImagePicker.openCamera({
            cropping: true,
            freeStyleCropEnabled: false,
            compressImageMaxWidth: 300
        }).then((image) => {
            setImageUrl(image)
        })
    }

    return (
        <SafeAreaView style={styles.rootView}>
            <ScrollView style={styles.boxImg} showsVerticalScrollIndicator={false}>
                {imageUrl?.path ? (
                    <>
                        <TouchableOpacity onPress={openCamera}>
                            <Image source={{ uri: imageUrl?.path }} style={styles.analyzeImg} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleAnalyzeImg} style={styles.analyzeBtn}>
                            <Text style={styles.analyzeText}>Analyze</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity onPress={openCamera} style={styles.createVoteBox} activeOpacity={0.8}>
                        <Image source={require('./assets/ic_camera.png')} style={styles.icCamera} />
                    </TouchableOpacity>
                )}
                {analysisContent && <Text>{JSON.stringify(analysisContent?.result, null, 5)}</Text>}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        marginTop: 70
    },
    icCamera: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    createVoteBox: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#DADADA',
        borderRadius: 10
    },
    createVoteText: {
        fontSize: 18,
        marginTop: 5
    },
    titleText: {
        textAlign: 'center',
        fontSize: 13,
        paddingVertical: 10
    },
    boxImg: {
        marginHorizontal: 16
    },
    analyzeImg: {
        height: 400,
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 5
    },
    analyzeBtn: {
        alignSelf: 'center',
        backgroundColor: '#45A539',
        marginVertical: 20,
        borderRadius: 5
    },
    analyzeText: {
        color: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 18,
        fontWeight: '700'
    }
})

export default App
