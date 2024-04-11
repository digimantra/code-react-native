import {
  Image,
  ImageRequireSource,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import React, {memo, useContext, useMemo} from 'react';
import ThemeColor from '../../theme/Colors';
import {fontSizes, moderateScale} from '../../utils/Constant';
import {fontFamily} from '../../utils/fontFamily';
import {AppContext} from '../../appContext';
import {AppThemeType} from '../../theme';
import {If} from '../../HOC/If';

interface CustomButtonProps {
  onPress?: () => void | Promise<void> | undefined;
  title?: string;
  linkTitle?: string;
  leftImage?: ImageRequireSource;
  titleStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle> | undefined;
  type?: 'primary' | 'secondary' | 'muted' | 'link' | 'social' | null;
  size?: 'normal' | 'small';
  disabled?: boolean;
}
const CustomButton: React.FC<CustomButtonProps> = ({
  onPress = () => {},
  type = 'primary',
  size = 'normal',
  title = '',
  linkTitle = '',
  leftImage,
  titleStyle,
  buttonStyle,
  disabled = false,
}) => {
  const {appTheme} = useContext(AppContext);
  const isDarkMode = useColorScheme() === 'dark';

  const styles = generateStyle(isDarkMode, appTheme);

  const renderButtonStyle = useMemo(() => {
    switch (type) {
      case 'primary':
        return styles.primaryButton;
      case 'secondary':
        return styles.secondaryButton;
      case 'social':
        return styles.socialButton;
      case 'muted':
        return styles.mutedButton;
      case 'link':
        return styles.linkButton;
      default:
        break;
    }
  }, [
    styles.linkButton,
    styles.mutedButton,
    styles.primaryButton,
    styles.secondaryButton,
    styles.socialButton,
    type,
  ]);
  const renderTextStyle = useMemo(() => {
    switch (type) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      case 'social':
        return styles.socialText;
      case 'muted':
        return styles.mutedText;
      case 'link':
        return styles.linkText;
      default:
        break;
    }
  }, [
    styles.linkText,
    styles.mutedText,
    styles.primaryText,
    styles.secondaryText,
    styles.socialText,
    type,
  ]);

  const renderButtonSize = useMemo(() => {
    switch (size) {
      case 'small':
        return styles.smallButton;
      default:
        break;
    }
  }, [size, styles.smallButton]);
  const renderTextSizeStyle = useMemo(() => {
    switch (size) {
      case 'small':
        return styles.smallText;
      default:
        break;
    }
  }, [size, styles.smallText]);
  const iconColor = useMemo(() => {
    switch (type) {
      case 'primary':
        return ThemeColor.light;
      case 'secondary':
        return ThemeColor.primary;
      case 'muted':
        return ThemeColor.black;
      default:
        break;
    }
  }, [type]);
  return (
    <TouchableOpacity
      style={[
        styles.buttonStyle,
        renderButtonStyle,
        renderButtonSize,
        buttonStyle,
        // eslint-disable-next-line react-native/no-inline-styles
        {opacity: disabled ? 0.75 : 1},
      ]}
      disabled={disabled}
      onPress={onPress}>
      {leftImage ? (
        <Image
          source={leftImage}
          resizeMode="contain"
          style={styles.iconStyle}
          tintColor={iconColor}
        />
      ) : undefined}
      <If
        show={type === 'link'}
        fallback={
          <Text
            style={[
              styles.titleStyle,
              renderTextStyle,
              renderTextSizeStyle,
              titleStyle,
            ]}>
            {title}
          </Text>
        }>
        <Text
          style={[
            styles.titleStyle,
            renderTextStyle,
            renderTextSizeStyle,
            titleStyle,
          ]}>
          {title} <Text style={[styles.linkTitleStyle]}>{linkTitle}</Text>
        </Text>
      </If>
    </TouchableOpacity>
  );
};

const generateStyle = (isDarkMode: boolean, appTheme: AppThemeType) =>
  StyleSheet.create({
    container: {},
    /**Button */
    buttonStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderRadius: moderateScale(6),
      height: moderateScale(42),
      paddingHorizontal: 12,
      borderColor: ThemeColor.primary1,
      backgroundColor: ThemeColor.primary,
      gap: moderateScale(8),
      width: '100%',
    },
    primaryButton: {
      borderColor: ThemeColor.primary1,
      backgroundColor: ThemeColor.primary,
    },
    secondaryButton: {
      borderColor: ThemeColor.primary1,
      backgroundColor: appTheme.background1,
    },
    socialButton: {
      borderColor: appTheme.border2,
      backgroundColor: appTheme.background1,
    },
    mutedButton: {
      borderColor: ThemeColor.lightGray,
      backgroundColor: ThemeColor.gray,
    },
    linkButton: {
      borderWidth: 0,
      backgroundColor: ThemeColor.transparent,
    },

    /**Buton Size */
    smallButton: {
      height: moderateScale(28),
      paddingHorizontal: 8,
    },

    /**TextStyle */
    titleStyle: {
      fontSize: fontSizes.medium,
      color: ThemeColor.dark,
    },
    primaryText: {
      fontSize: fontSizes.large,
      fontFamily: fontFamily.Medium_Roboto,
      color: ThemeColor.dark1,
    },
    secondaryText: {
      fontSize: fontSizes.large,
      fontFamily: fontFamily.Regular_Roboto,
      color: ThemeColor.primary1,
    },
    socialText: {
      fontSize: fontSizes.large,
      fontFamily: fontFamily.Regular_Roboto,
      color: appTheme.text1,
    },
    mutedText: {
      fontSize: 14,
      // fontFamily: fonts.semiBold,
      color: ThemeColor.dark,
    },
    linkText: {
      fontSize: fontSizes.large,
      fontFamily: fontFamily.Light_Roboto,
      color: appTheme.text1,
      flexDirection: 'row',
    },
    linkTitleStyle: {
      fontSize: fontSizes.large,
      fontFamily: fontFamily.Regular_Roboto,
      color: ThemeColor.primary1,
      textDecorationLine: 'underline',
    },
    smallText: {
      fontSize: 12,
      // fontFamily: fonts.medium,
    },

    /**IconStyle */
    iconStyle: {
      width: moderateScale(24),
      height: moderateScale(24),
    },
  });

export default memo(CustomButton);
