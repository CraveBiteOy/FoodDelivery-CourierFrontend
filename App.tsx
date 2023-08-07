

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import MyStack from './src/navigators/MyStack';
import { ThemeProvider } from "./src/styles/theme"


function App() {

return (

  
  <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider>

      <MyStack />

    </ThemeProvider>
    
  </GestureHandlerRootView>


)

}



export default App;