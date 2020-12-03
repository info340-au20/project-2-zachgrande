const raf = require('raf') //fix raf warning, redux!

import React from 'react';
import Enzyme, {shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

//include custom matchers
const styleMatchers = require('jest-style-matchers');
expect.extend(styleMatchers);

//Enzyme config
Enzyme.configure({ adapter: new Adapter() });

//solution classes
import {App} from  './src/App'; // ADD NEW .js FILE NAMES HERE

/* Begin the tests */

describe('Source code is valid', () => {
  test('JavaScript lints without errors', async () => {
    const sources = ['index.js', 'App.js'].map((src) => __dirname + '/src/' + src);
    const linterOptions = {}; //this should be sufficient with other fields
    sources.forEach((source) => {
      expect([source]).toHaveNoEsLintErrors(linterOptions); //test each
    })
  })
});

describe('The MoodNotes app', () => { 
  it('renders without crashing', () => {
    shallow(<App />); //quick test
  });

  describe('implements an `App` component', () => {
    let wrapper; //the rendered app

    beforeAll(() => {
      wrapper = mount(<App />);
    })

    it('has the `container` CSS class', () => {
      let wrapper = shallow(<App />);
      expect(wrapper.hasClass('container')).toBe(true);
    })

  })

})




