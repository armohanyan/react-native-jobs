import {useGlobalSearchParams, useRouter, Stack} from "expo-router";
import {
    ActivityIndicator,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
    View, FlatList, SectionList
} from "react-native";
import {COLORS, icons, images} from "../../constants";
import {ScreenHeaderBtn} from "../../components";

import styles from '../../styles/profile-settings'
import {useCallback, useEffect, useState} from "react";
import ProfileCard from "../../components/common/cards/profile/ProfileCard";
import SettingsCard from "../../components/common/cards/profile/settings/SettingsCard";

const accountSettings = [
    {
        title: 'Account',
        data: [
            {
                label: 'Push Notifications',
                value: 'notification',
                icon: images.notification,
                bgColor: '#e9a9f1'
            },
            {
                label: 'Location',
                value: 'location',
                icon: images.locationWhite,
                bgColor: '#70dee9'
            },
            {
                label: 'Language',
                value: 'language',
                icon: images.language,
                bgColor: '#eea6a2'
            }
        ]
    },
    {
        title: 'More',
        data: [
            {
                label: 'About US',
                value: 'about',
                icon: images.aboutUs,
                bgColor: '#a1c8ef'
            },
            {
                label: 'Terms and Policies',
                value: 'termsAndPolicies',
                icon: images.light,
                bgColor: '#c0c0c0'
            },
        ]
    }

]

const ProfileSettings = () => {
    const params = useGlobalSearchParams()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [refreshing, setRefreshing] = useState(false)
    const accountDetails = () => {
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }

    useEffect(() => {
        accountDetails()
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        accountDetails()
        setRefreshing(false)
    }, [])


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: COLORS.lightWhite},
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn
                        iconUrl={icons.left}
                        dimension='60%'
                        handlePress={() => router.back()}
                    />
                ),
                headerRight: () => (
                    <TouchableOpacity>
                        <Text style={styles.logOut}>Log out</Text>
                    </TouchableOpacity>
                ),
                headerTitle: "Settings"
            }}/>

            <>
                <ScrollView showsHorizontalScrollIndicator={false}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                >
                    <View style={styles.container}>
                        {
                            isLoading ? (
                                <ActivityIndicator size='large' color={COLORS.primary}/>
                            ) : error ? (
                                <Text>Something went wrong</Text>
                            ) : (
                                <>
                                    <ProfileCard
                                        profileName='Armen Ohanyan'
                                        email='ohanyyanarmen@gmial.com'
                                        avatar={images.profile}
                                    />

                                    <SectionList
                                        sections={accountSettings}
                                        renderItem={({item}) => {
                                            return (
                                                <SettingsCard item={item} />
                                            )
                                        }}
                                        renderSectionHeader={( {section: { title } } ) => {
                                            return (
                                                <>
                                                    <View style={styles.settingsListContainer}>
                                                        <Text style={styles.settingsHeaderTitle}>{title}</Text>
                                                    </View>
                                                </>
                                            )
                                        }}
                                    />
                                </>
                            )
                        }
                    </View>
                </ScrollView>
            </>
        </SafeAreaView>
    )
}

export default ProfileSettings
