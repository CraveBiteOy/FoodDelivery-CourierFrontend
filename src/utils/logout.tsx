
import { logout } from '../store/actions/UserAction';

export const logoutUtil = (dispatch: any, navigation: any) => {
  dispatch(logout() as any);
  navigation.navigate('Login');
}
 