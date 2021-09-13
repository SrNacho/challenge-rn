import {TouchableHighlight} from 'react-native';
import styled from 'styled-components';

const Button = styled(TouchableHighlight)({
  color: '#FFFFFF',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 12,
  paddingHorizontal: 32,
  borderRadius: 4,
  elevation: '7',
  backgroundColor: '#24C16D',
  marginBottom: 10,
});

export default Button;
