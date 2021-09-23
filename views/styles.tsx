import {StyleSheet} from 'react-native';
import styled from 'styled-components';
import {View, Text, TouchableHighlight} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
export const styles = StyleSheet.create({
  timeText: {
    fontSize: 16,
    letterSpacing: 0.25,
    color: '#a8a8a8',
    textTransform: 'uppercase',
    textAlign: 'left',
    flex: 1,
    fontFamily: 'Roboto-Regular',
    paddingLeft: 20,
  },
  flatListCompleted: {
    flex: 1,
    marginVertical: 18,
  },
  flatListUncompleted: {
    flex: 2,
    marginVertical: 18,
  },
  scrollView: {flexGrow: 1},
  dropDown: {
    color: 'red',
  },
  timeButtonItems: {
    flex: 1,
  },
  icons: {
    color: '#a8a8a8',
    paddingTop: 3,
  },
  placeHolderStyle: {
    color: '#a8a8a8',
  },
});

export const Title = styled(Text)({
  fontSize: 24,
  color: '#000',
  fontFamily: 'Roboto-Medium',
});

export const ButtonText = styled(Text)({
  fontSize: 17,
  color: '#FFF',
  fontWeight: 'normal',
});

export const ListContainer = styled(View)({
  flex: 1,
});

export const DropDown = styled(DropDownPicker)({
  borderWidth: 0,
});

export const ItemContainer = styled(View)({
  marginVertical: 15,
});

export const TimeButton = styled(TouchableHighlight)({
  justifyContent: 'flex-start',
  paddingVertical: 12,
  paddingRight: 20,

  borderRadius: 4,
  borderColor: '#e0e0e0',
  marginBottom: 10,
});

export const Button = styled(TouchableHighlight)({
  color: '#FFFFFF',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 17,

  borderRadius: 20,
  backgroundColor: '#24C16D',
  marginBottom: 25,
  marginHorizontal: 32,
});

export const MainContainer = styled(View)({
  flex: 1,
  backgroundColor: 'white',
});

export const MainContainerChild = styled(View)({
  flex: 1,
  marginHorizontal: '5%',
});

export const DatesContainer = styled(View)({
  flexDirection: 'row',
});

export const LabelTimeButton = styled(View)({
  flexDirection: 'row',
});

export const NavigatorSeparator = styled(View)({
  borderBottomColor: '#EEEEF0',
  borderBottomWidth: 1,
});
