import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import * as Student from '../src/js/model/Student';

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  Student.resetId();
});
