import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Image, SectionList, Text, View} from 'react-native';
// import {useAppSelector} from '../../reduxToolkit/store';
import WrapperContainer from '../../components/atoms/WrapperContainer';
import AppHeader from '../../components/atoms/AppHeader';
import CommonStyle from '../../theme/CommonStyle';
import {AppContext} from 'app/appContext';
import {generateStyle} from './styles';
import {AppImagesCommon} from 'app/theme/AppImages';
import ThemeColor from 'app/theme/Colors';
import ImageBackgroundContainer from 'app/HOC/ImageBackgroundContainer';
import LeftRightComp from 'app/components/atoms/LeftRightComp';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {HomeSectionHeaderProps, TaskItem} from '../types';
import CardViewLeftRightComp from 'app/components/molecules/CardViewLeftRightComp';
import FastImage from 'react-native-fast-image';
import LoadingSpinner from 'app/components/molecules/LoadingSpinner';
import {PieChart} from 'react-native-gifted-charts';
import {moderateScale} from 'app/utils/Constant';
import {useNavigation} from '@react-navigation/native';
import {openDrawer} from 'app/utils/Helper';
import {RootState, useAppSelector} from 'app/reduxToolkit/store';

const newTaskData: HomeSectionHeaderProps[] = [
  {
    title: 'NearBy',
    data: [
      {
        id: '1',
        name: 'Ganesh Mandir',
        distance: '1670 m',
      },
      {
        id: '6',
        name: 'Ganesh Mandir',
        distance: '1670 m',
      },
    ],
  },
  {
    title: 'Last Visited',
    data: [
      {
        id: '7',
        name: 'Ganesh Mandir',
        location: 'Dhori, Raipur',
        cost: '135',
      },
    ],
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  // const {deviceData} = useAppSelector(state => state.UserSlice);
  const {appTheme} = useContext(AppContext);
  const styles = generateStyle(appTheme);
  const tabBarHeight = useBottomTabBarHeight();
  const {
    assetsData: {
      wallet: {assets_items = 0, assets_temple_shares = '0'} = {},
      chances_risks_params: {
        percent_danger = 10,
        percent_luck = 10,
        percent_protection = 10,
        inside_rotation_ms = 1000,
      } = {},
    } = {},
  } = useAppSelector((state: RootState) => state.CommonSlice);

  const [trendIncrease, setTrendIncrease] = useState<boolean>(true);
  // created a function to update the state and set the random true of false on mount ?
  useEffect(() => {
    const updateTrendIncrease = () => {
      setTrendIncrease(Math.random() < 0.5);
    };

    updateTrendIncrease();
  }, []);

  const renderItem = useCallback(
    ({item}: {item: TaskItem}) => (
      <CardViewLeftRightComp
        centerTexts={item.name}
        centerBelow2Text={item.distance || item.location}
        rightTexts={item.cost}
        rightIcon={item.cost ? undefined : AppImagesCommon.PATH_RIGHT_ICON}
      />
    ),
    [],
  );

  const renderSectionHeader = useCallback(
    ({section}: {section: HomeSectionHeaderProps}) => (
      <View style={styles.sectionHeader}>
        <LeftRightComp
          title1={section.title}
          title2="View All"
          icon1={AppImagesCommon.REFRESH_ICON}
          icon2={AppImagesCommon.RIGHT_ARROW_ICON}
        />
      </View>
    ),
    [styles.sectionHeader],
  );
  const itemSeparate = useCallback(
    () => <View style={styles.separator} />,
    [styles.separator],
  );
  const renderInsideChart = useCallback(() => {
    return (
      <LoadingSpinner durationMs={inside_rotation_ms}>
        <FastImage
          source={AppImagesCommon.CHAKAR_ICON}
          style={styles.chakarIcon}
          resizeMode="contain"
        />
      </LoadingSpinner>
    );
  }, [inside_rotation_ms, styles.chakarIcon]);
  return (
    <WrapperContainer>
      <AppHeader showBellIcon onMenuPress={() => openDrawer(navigation)} />
      <View style={[styles.containerStyle]}>
        {/* golden card container */}
        <View style={[styles.goldenCardContainer, CommonStyle.paddingH16]}>
          <ImageBackgroundContainer
            resizeMode="contain"
            darkPath={AppImagesCommon.GOLDEN_ICON}
            lightPath={AppImagesCommon.GOLDEN_ICON}
            containerStyle={styles.goldenImg}>
            <View style={[CommonStyle.rowCenter, styles.insideCardContainer]}>
              {/* left */}
              <View style={[CommonStyle.flex1]}>
                <View style={styles.leftInsideCard}>
                  {/* user */}
                  <View style={styles.userNameView}>
                    <Text style={styles.userName}>PREM KUMAR SHAHI</Text>
                    <Text style={styles.totalShare}>
                      Total Share{' '}
                      <Text style={styles.totalShareValue}>
                        {assets_temple_shares}
                      </Text>
                    </Text>
                  </View>
                  {/* share */}
                  <View>
                    <Text style={styles.shareValue}>Share Value</Text>
                    <Text style={styles.shareCRDValue}>
                      {assets_items} <Text style={styles.shareCRD}>CRD</Text>
                    </Text>
                  </View>
                  {/* trend line */}
                  <View style={[CommonStyle.rowCenter, styles.trendTextView]}>
                    <Image
                      source={AppImagesCommon.TREND_LINE_ICON}
                      style={[
                        {
                          transform: [
                            {
                              rotate: trendIncrease ? '0deg' : '180deg',
                            },
                          ],
                        },
                      ]}
                      tintColor={
                        trendIncrease ? ThemeColor.green1 : ThemeColor.red
                      }
                    />
                    <Text
                      style={[
                        styles.trendValue,
                        {
                          color: trendIncrease
                            ? ThemeColor.green1
                            : ThemeColor.red,
                        },
                      ]}>
                      {trendIncrease ? '+' : '-'}1.3{' '}
                      <Text style={styles.trendMonthText}>/Month</Text>
                    </Text>
                  </View>
                </View>
              </View>
              {/* right */}
              <View style={[CommonStyle.flex1]}>
                <FastImage
                  source={AppImagesCommon.GOLDEN_CIRCLE_ICON}
                  style={styles.goldenCircleIcon}
                  resizeMode="contain">
                  <View style={styles.pieChartView}>
                    <FastImage source={AppImagesCommon.ELIPSE_ICON}>
                      <PieChart
                        innerRadius={moderateScale(40)}
                        radius={moderateScale(58)}
                        strokeColor={ThemeColor.primary2}
                        strokeWidth={5}
                        donut
                        showGradient
                        data={[
                          {
                            value: percent_protection,
                            color: ThemeColor.chartProtection,
                            gradientCenterColor: ThemeColor.chartProtection1,
                          },
                          {
                            value: percent_luck,
                            color: ThemeColor.chartLuck,
                            gradientCenterColor: ThemeColor.chartLuck1,
                          },
                          // danger
                          {
                            value: percent_danger,
                            color: ThemeColor.chartDanger,
                            gradientCenterColor: ThemeColor.chartDanger1,
                          },
                        ]}
                        innerCircleColor={ThemeColor.primary2}
                        innerCircleBorderWidth={10}
                        innerCircleBorderColor={'transparent'}
                        centerLabelComponent={renderInsideChart}
                      />
                    </FastImage>
                  </View>
                </FastImage>

                {/* <View>
                  <PieChart />
                </View> */}
                <View style={[CommonStyle.rowCenter, styles.protectionView]}>
                  <View
                    style={[
                      styles.smallCircle,
                      {backgroundColor: ThemeColor.purple},
                    ]}
                  />
                  <Text style={styles.protectionText}>Luck</Text>
                  <View
                    style={[
                      styles.smallCircle,
                      {backgroundColor: ThemeColor.green},
                    ]}
                  />
                  <Text style={styles.protectionText}>Protection</Text>
                  <View
                    style={[
                      styles.smallCircle,
                      {backgroundColor: ThemeColor.red},
                    ]}
                  />
                  <Text style={styles.protectionText}>Danger</Text>
                </View>
              </View>
            </View>
          </ImageBackgroundContainer>
        </View>
        {/* nearby container */}
        <View
          style={[
            styles.nearbyContainer,
            CommonStyle.flex2,
            CommonStyle.paddingH16,
          ]}>
          {/* nearby */}
          <View style={[CommonStyle.flex1, {marginBottom: tabBarHeight}]}>
            <SectionList
              showsVerticalScrollIndicator={false}
              sections={newTaskData}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
              keyExtractor={item => String(item.id)}
              ItemSeparatorComponent={itemSeparate}
            />
          </View>
        </View>
      </View>
    </WrapperContainer>
  );
};

export default HomeScreen;
