import {StyleSheet, View, useColorScheme, Text, Pressable} from 'react-native';
import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import CustomButton from '../../components/atoms/CustomButton';
import {fontSizes, moderateScale} from '../../utils/Constant';
import {AppContext} from '../../appContext';
import {AppThemeType} from '../../theme';
import BottomSheetComp from '../../HOC/BottomComp';
import CommonStyle from '../../theme/CommonStyle';
import DashedLine from '../../components/atoms/DashLine';
import {fontFamily} from '../../utils/fontFamily';
import {If} from '../../HOC/If';
import {ROUTE_NAME_ENUM} from '../../routes/types';
import TextField from '../../components/atoms/TextField';
import ImageBackgroundContainer from '../../HOC/ImageBackgroundContainer';
import {AppImagesDark, AppImagesLight} from '../../theme/AppImages';
import {isValidEmail, navigateToNextScreen} from 'app/utils/Helper';
import CountryPicker, {
  Country,
  // DARK_THEME,
  // DEFAULT_THEME,
} from 'react-native-country-picker-modal';
import {UserInputFieldType} from '../types';
import {useAppSelector} from 'app/reduxToolkit/store';
import {useLoginRegisterWithMailMobileMutation} from 'app/reduxToolkit/services/auth.service';
import {LoginSendData} from 'app/utils/types';
import AppToast from 'app/HOC/AppToast';

const MobileLoginScreen = () => {
  const navigation = useNavigation();
  console.log('---------- MobileLoginScreen ----------');
  const {appTheme} = useContext(AppContext);
  const isDarkMode = useColorScheme() === 'dark';
  const styles = generateStyle(isDarkMode, appTheme);

  const {deviceData} = useAppSelector(state => state.UserSlice);
  const [loginSignUp] = useLoginRegisterWithMailMobileMutation();
  console.log('deviceData', deviceData);
  const onSelect = (selected: Country) => {
    console.log('selected', selected);
    setUserData({
      ...userData,
      callingCode: selected.callingCode[0],
      cca2: selected.cca2,
      name: selected.name,
      flag: selected.flag,
    });
  };

  const [phoneEmailLogin, setPhoneEmailLogin] = useState('phone');
  const [userData, setUserData] = useState<UserInputFieldType>({
    email: '',
    mobileNumber: '',
    callingCode: '91',
    cca2: 'IN',
    name: 'India',
    flag: '🇮🇳',
  });
  const [isPickerModal, setIsPickerModal] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (phoneEmailLogin === 'email' && !isValidEmail(userData.email)) {
      return;
    }
    if (phoneEmailLogin === 'phone' && userData.mobileNumber.length < 8) {
      return;
    }
    const body = new FormData();
    if (userData.mobileNumber) {
      body.append('user_phone_country_prefix', '+' + userData.callingCode);
      body.append('user_phone', userData.mobileNumber);
    } else {
      body.append('usermail', userData.email);
    }
    body.append('dev_UUID', deviceData?.dev_UUID);
    body.append('dev_UUID_srv', deviceData?.dev_UUID_srv);
    body.append('app_version', deviceData?.app_version);
    body.append('dev_latlng', '');
    const loginSendData: LoginSendData = {
      body,
      devid: deviceData?.devid,
    };
    await loginSignUp(loginSendData);
    navigateToNextScreen(navigation, {
      name: ROUTE_NAME_ENUM.Otp_Screen,
      params: {
        type: phoneEmailLogin,
        user_phone_country_prefix: '+' + userData.callingCode,
        user_phone: userData.mobileNumber,
        usermail: userData.email,
      },
    });
  };

  return (
    <View style={styles.container}>
      <AppToast />
      <ImageBackgroundContainer
        showAppLogo={true}
        lightPath={AppImagesLight.imageBackground}
        darkPath={AppImagesDark.imageBackground}>
        <View style={CommonStyle.flex2}>
          <BottomSheetComp
            containerStyle={styles.bottomSheetContainer}
            snapPoints={['100%']}>
            <View style={styles.contentContainer}>
              <View style={styles.btnContainer}>
                <View>
                  <Text style={styles.helloStyle}>Hello,</Text>
                  <If
                    show={phoneEmailLogin === 'phone'}
                    fallback={
                      <>
                        <Text style={styles.loginText}>Verify Your Email</Text>
                        <TextField
                          type="email"
                          placeholder="Email Address"
                          value={userData.email}
                          containerStyle={styles.mobileTextFieldStyle}
                          maxLength={35}
                          autoCapitalize="none"
                          onChangeText={text => {
                            setUserData({
                              ...userData,
                              email: text,
                            });
                          }}
                        />
                        {/* <TextField
                          placeholder="Password"
                          containerStyle={styles.textFieldStyle}
                        /> */}
                      </>
                    }>
                    <Text style={styles.loginText}>
                      Verify Your Phone Number
                    </Text>
                    <View style={styles.phoneView}>
                      <Pressable
                        onPress={() => setIsPickerModal(true)}
                        style={styles.countryPickerView}>
                        <CountryPicker
                          countryCode={userData.cca2 || 'IN'}
                          withCallingCode
                          withAlphaFilter
                          withFilter
                          withFlag
                          onSelect={onSelect}
                          visible={isPickerModal}
                          theme={{
                            backgroundColor: appTheme.background,
                            primaryColor: appTheme.text2,
                            primaryColorVariant: appTheme.border2,
                            onBackgroundTextColor: appTheme.text2,
                            fontFamily: fontFamily.Regular_Roboto,
                            fontSize: fontSizes.xLarge,
                            flagSize: moderateScale(22),
                            activeOpacity: 1,
                            filterPlaceholderTextColor: appTheme.placeholder,
                          }}
                          // theme={isDarkMode ? DARK_THEME : DEFAULT_THEME}
                          onClose={() => setIsPickerModal(false)}
                        />
                        <Text style={styles.callingCodeText}>
                          +{userData.callingCode}
                        </Text>
                      </Pressable>
                      <View style={styles.width85}>
                        <TextField
                          type="number"
                          placeholder="Enter your mobile number "
                          containerStyle={styles.mobileTextFieldStyle}
                          maxLength={15}
                          value={userData.mobileNumber}
                          onChangeText={text => {
                            setUserData({
                              ...userData,
                              mobileNumber: text.replace(/[^0-9]/g, ''),
                            });
                          }}
                        />
                      </View>
                    </View>
                  </If>
                </View>
                <CustomButton
                  type={'primary'}
                  title="Next"
                  onPress={handleSubmit}
                />
                <View style={[CommonStyle.rowCenter, styles.container2]}>
                  <DashedLine dashStyle={styles.dashStyle} />
                  <View style={styles.textContainer}>
                    <Text style={styles.OrStyle}>OR</Text>
                  </View>
                  <DashedLine dashStyle={styles.dashStyle} />
                </View>
                <If
                  show={phoneEmailLogin === 'phone'}
                  fallback={
                    <CustomButton
                      type={'secondary'}
                      title="Log in with number"
                      onPress={() => setPhoneEmailLogin('phone')}
                    />
                  }>
                  <CustomButton
                    type={'secondary'}
                    title="Log in with Email"
                    onPress={() => setPhoneEmailLogin('email')}
                  />
                </If>
                {/* social logins */}
                <CustomButton
                  type={'social'}
                  leftImage={require('../../assets/commonIcons/GLogo.png')}
                  title="Log in with Goggle"
                  onPress={() => {}}
                />
                <CustomButton
                  type={'social'}
                  leftImage={require('../../assets/commonIcons/metaLogo.png')}
                  title="Log in with Meta"
                  onPress={() => {
                    Toast.show({
                      type: 'info',
                      text1: 'Hello Message from toast',
                      // And I can pass any custom props I want
                      props: {
                        uuid: 'bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d70',
                        message: 'Hello Toast',
                      },
                    });
                  }}
                />
                {/* sign up  */}
                {/* <CustomButton
                  type={'link'}
                  title="Don't have account"
                  linkTitle="Sign Up"
                  onPress={() =>
                    navigateToNextScreen(navigation, ROUTE_NAME_ENUM.singUp_Screen)
                  }
                /> */}
                <View />
              </View>
            </View>
          </BottomSheetComp>
        </View>
      </ImageBackgroundContainer>
    </View>
  );
};

export default MobileLoginScreen;

const generateStyle = (isDarkMode: boolean, appTheme: AppThemeType) =>
  StyleSheet.create({
    container2: {
      marginVertical: moderateScale(20),
    },
    textContainer: {
      paddingHorizontal: moderateScale(16),
    },
    dashStyle: {
      backgroundColor: appTheme.dash,
    },
    container: {
      flex: 1,
      backgroundColor: appTheme.background,
    },
    imageStyle: {
      flex: 1,
    },
    contentContainer: {
      paddingHorizontal: moderateScale(16),
      backgroundColor: appTheme.background1,
      borderTopLeftRadius: 14,
      borderTopRightRadius: 14,
      borderTopWidth: 0.5,
      borderColor: appTheme.border2,
      elevation: 2, // Represents the shadow depth
      shadowOpacity: 1, // Opacity: 100%
      shadowRadius: 4, // Blur
      shadowOffset: {
        width: 2, // No horizontal offset
        height: 0, // Offset Y: 2dp
      },
      shadowColor: '#0000000A',
    },
    bottomSheetContainer: {
      backgroundColor: appTheme.background1,
    },
    handleStyle: {
      flex: 1,
    },
    centeredContainer: {
      alignItems: 'center',
    },
    btnContainer: {
      height: '100%',
      width: '100%',
      gap: moderateScale(12),
    },
    OrStyle: {
      color: appTheme.text1,
      fontSize: fontSizes.small,
      fontFamily: fontFamily.Regular_Roboto,
      lineHeight: moderateScale(20),
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    helloStyle: {
      color: appTheme.text1,
      fontSize: fontSizes.small,
      fontFamily: fontFamily.Regular_Roboto,
      lineHeight: moderateScale(20),
      textAlign: 'left',
      textTransform: 'capitalize',
      marginTop: moderateScale(16),
    },
    loginText: {
      color: appTheme.text2,
      fontSize: fontSizes.xxLarge,
      fontFamily: fontFamily.Regular_Roboto,
      textAlign: 'left',
      marginBottom: moderateScale(12),
    },
    textFieldStyle: {
      height: moderateScale(56),
      width: '100%',
    },
    mobileTextFieldStyle: {
      height: moderateScale(56),
      width: '100%',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 0,
      borderColor: appTheme.border2,
      borderWidth: 1,
    },
    countryPickerView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '30%',
      height: moderateScale(56),
      borderWidth: 1,
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      borderColor: appTheme.border2,
      marginBottom: moderateScale(12),
      backgroundColor: appTheme.background2,
    },
    phoneView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    width85: {width: '70%'},
    callingCodeText: {
      color: appTheme.text1,
      fontSize: fontSizes.large,
      fontFamily: fontFamily.Regular_Roboto,
      textAlign: 'left',
      textTransform: 'capitalize',
    },
  });
