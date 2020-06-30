import { fireEvent } from '@testing-library/dom';

import { mobileCareers } from './data/mobileCareer';
import { App } from './app';

describe('Terms', () => {
  it('should not throw error on render', () => {
    const wrapper: HTMLDivElement = document.createElement('div');
    const app: App = new App(wrapper);

    expect(app.state.carrierCode).toBe(mobileCareers[0].code);
    expect(app.state.name).toBe(undefined);
    expect(app.state.phoneNumber).toBe(undefined);
    expect(app.state.registerNumber).toBe(undefined);
    expect(app.state.termsCode.size).toBe(0);

    const buttonElements: HTMLCollectionOf<HTMLButtonElement> = wrapper.getElementsByTagName('button');
    expect(buttonElements.length).toBe(1);
  });

  it('should sbe ubmit button disabled with initial state', () => {
    const wrapper: HTMLDivElement = document.createElement('div');
    const app: App = new App(wrapper);

    const buttonElements: HTMLCollectionOf<HTMLButtonElement> = wrapper.getElementsByTagName('button');
    expect(buttonElements[0].disabled).toBe(true);
  });

  it('should be submit button not disabled and call console.log when state is satisfied', () => {
    const wrapper: HTMLDivElement = document.createElement('div');
    const app: App = new App(wrapper);
    const consoleLog = jest.spyOn(console, 'log');
    app.state = {
      termsCode: new Set(['1', '2', '3']),
      carrierCode: mobileCareers[0].code,
      name: '고영희',
      phoneNumber: '1234561234',
      registerNumber: '1234567',
    };
    app.onChange();
    const buttonElements: HTMLCollectionOf<HTMLButtonElement> = wrapper.getElementsByTagName('button');
    expect(buttonElements[0].disabled).toBe(false);

    fireEvent.click(buttonElements[0]);
    expect(consoleLog).toBeCalledWith({
      termsCode: ['1', '2', '3'],
      carrierCode: mobileCareers[0].code,
      name: '고영희',
      phoneNumber: '1234561234',
      registerNumber: '1234567',
    });
  });
});