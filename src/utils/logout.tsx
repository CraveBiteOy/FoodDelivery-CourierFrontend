
import { logout } from '../store/actions/UserAction';
import { closeSocket } from './setupSocket';

export const logoutUtil = (dispatch: any, navigation: any) => {
  dispatch(logout() as any);
  closeSocket();
  navigation.navigate('Login');
}
 