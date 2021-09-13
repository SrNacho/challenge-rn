import {TouchableHighlight} from 'react-native';
import styled from 'styled-components';

const TimeButton = styled(TouchableHighlight)({
  justifyContent: 'flex-start',
  paddingVertical: 12,
  paddingRight: 100,
  paddingLeft: 20,
  borderRadius: 4,
  borderColor: '#e0e0e0',
  borderWidth: 1,
  backgroundColor: '#fff',
  marginBottom: 10,
});

export default TimeButton;
