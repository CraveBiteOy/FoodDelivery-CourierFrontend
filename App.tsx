

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import MyStack from './src/navigators/MyStack';
import { PaperProvider } from 'react-native-paper';



function App() {

return (

  <GestureHandlerRootView style={{ flex: 1 }}>

      <MyStack />

    
  </GestureHandlerRootView>

)

}



export default App;