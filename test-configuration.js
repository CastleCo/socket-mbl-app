import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new Adapter() });

// import react-native-mock
// import "react-native-mock/mock";

// jest.mock('.src/assets/fonts/Ionicons.ttf');

// figure out how to only block react-native warnings
beforeAll(() => {
  jest.spyOn(console, 'error');

  // actually disable console errors
  if (process.env.REACT_NATIVE_HIDE_WARNINGS) console.error = jest.fn();
});

afterAll(() => {
  console.error.mockRestore();
});