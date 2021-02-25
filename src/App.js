import GlobalStyles from "./Component/GlobalStyles";
import data from './Data/generatedata';
import {ThemeProvider} from 'styled-components';
import theme from './style/theme';
import Thum from './Component/Thum';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {data.map((thum)=>(
              <Thum key={thum.id} cut={thum.image} />  
            )
          )
        }
      </ThemeProvider>
    </>
  );
}

export default App;
