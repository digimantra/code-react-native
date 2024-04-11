import {StyleSheet} from 'react-native';
import {AppThemeType} from 'app/theme';
import {fontSizes, moderateScale} from 'app/utils/Constant';
import ThemeColor from 'app/theme/Colors';
import {fontFamily} from 'app/utils/fontFamily';
import CommonStyle from '../../theme/CommonStyle';

export const generateStyle = (appTheme: AppThemeType) =>
  StyleSheet.create({
    containerStyle: {
      backgroundColor: appTheme.background2,
      flex: 1,
    },
    goldenCardContainer: {
      height: moderateScale(224),
      width: '100%',
      position: 'relative',
      marginVertical: moderateScale(20),
    },
    goldenImg: {
      height: '100%',
      width: '100%',
    },
    insideCardContainer: {
      justifyContent: 'space-evenly',
      padding: moderateScale(16),
    },
    goldenCircleIcon: {
      height: moderateScale(160),
      width: moderateScale(160),
      justifyContent: 'center',
      alignItems: 'center',
    },
    chakarIcon: {
      height: moderateScale(70),
      width: moderateScale(70),
      alignSelf: 'center',
    },
    pieChartView: {
      height: moderateScale(140),
      width: moderateScale(140),
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    protectionView: {
      width: 'auto',
      backgroundColor: ThemeColor.cream,
      borderRadius: moderateScale(20),
      justifyContent: 'space-evenly',
    },
    protectionText: {
      fontSize: fontSizes.xSmall,
      fontFamily: fontFamily.Regular_Rubik,
      color: ThemeColor.brown,
      textTransform: 'capitalize',
    },
    smallCircle: {
      height: moderateScale(7),
      width: moderateScale(7),
      borderRadius: moderateScale(50),
    },
    leftInsideCard: {
      flex: 1,
      justifyContent: 'space-between',
      gap: 10,
      textAlign: 'left',
    },
    userNameView: {
      paddingTop: moderateScale(20),
    },
    userName: {
      fontSize: fontSizes.medium,
      fontFamily: fontFamily.SemiBold_Rubik,
      color: ThemeColor.brown,
      textTransform: 'uppercase',
    },
    totalShare: {
      fontSize: fontSizes.small,
      fontFamily: fontFamily.Regular_Rubik,
      color: ThemeColor.brown,
      textTransform: 'capitalize',
    },
    shareValue: {
      fontSize: fontSizes.small,
      fontFamily: fontFamily.Regular_Rubik,
      color: ThemeColor.brown,
      textTransform: 'capitalize',
    },
    shareCRDValue: {
      fontSize: fontSizes.xxLarge - 1,
      fontFamily: fontFamily.SemiBold_Rubik,
      color: ThemeColor.brown,
      textTransform: 'capitalize',
    },
    shareCRD: {
      fontSize: fontSizes.small + 1,
      fontFamily: fontFamily.Regular_Rubik,
      color: ThemeColor.brown,
      textTransform: 'uppercase',
    },
    trendTextView: {
      gap: moderateScale(6),
      justifyContent: 'flex-start',
    },
    totalShareValue: {
      fontSize: fontSizes.medium,
      fontFamily: fontFamily.Regular_Rubik,
      color: ThemeColor.brown,
      textTransform: 'capitalize',
    },
    trendValue: {
      fontSize: fontSizes.small,
      fontFamily: fontFamily.SemiBold_Rubik,
      textTransform: 'capitalize',
    },
    trendMonthText: {
      fontSize: fontSizes.xSmall,
      fontFamily: fontFamily.SemiBold_Rubik,
      color: ThemeColor.brown,
      textTransform: 'capitalize',
    },
    containerStyle2: {
      marginTop: moderateScale(16),
    },
    nearbyContainer: {
      backgroundColor: appTheme.background1,
      borderTopColor: appTheme.border2,
      borderTopWidth: 0.5,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      ...CommonStyle.shadow2,
    },
    nearAllText: {
      fontSize: fontSizes.small,
      fontFamily: fontFamily.Regular_Roboto,
      color: appTheme.text2,
      textTransform: 'capitalize',
    },
    taskItem: {},
    sectionHeader: {marginBottom: moderateScale(16)},
    separator: {
      paddingVertical: moderateScale(8),
    },
    donutInnerView: {
      color: 'red',
    },
  });
