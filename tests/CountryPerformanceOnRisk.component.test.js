import { CountryPerformanceOnRisk, CountrySelect }
from '../src/components/CountryPerformanceOnRisk.js';
import React from 'react';
import { Provider } from 'react-redux';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';


describe('Components are working fine', () => {

  it('computeState works', () => {
    const wrapper = shallow(< CountryPerformanceOnRisk data={['Is Working']}/>)
    let out = wrapper.instance().computeState()
    expect(out.data).toEqual(['Is Working'])
  })

  it('Div with id DDOS-graph is there', () => {
    const wrapper = shallow(< CountryPerformanceOnRisk />)
    expect(toJson(wrapper)).toMatchSnapshot();
  })

  it('When a country is selected, it updates state of the container', () => {
    function stub() {return ''}
    const wrapper = shallow(< CountryPerformanceOnRisk dispatch={stub} />)
    let newCountry = {value: 'us', label: 'United States'}
    expect(wrapper.find('CountrySelect').at(2).props().selectedCountries)
      .toEqual(undefined)
    wrapper.find('CountrySelect').at(2).simulate('change', newCountry)
    expect(wrapper.find('CountrySelect').at(2).props().selectedCountries)
      .toEqual(newCountry)
  })

})

describe('Country Select component', () => {
  function setup() {
    let props = {
      selectOptions: [
        {value: '', label: 'Select a country'},
        {value: 'uk', label: 'United Kingdom' }
      ],
      onChange: jest.fn(),
      selectedCountries: undefined
    }

    const enzymeWrapper = shallow(< CountrySelect {...props} />)

    return {
      props,
      enzymeWrapper
    }
  }

  it('Dropdown is there', () => {
    const wrapper = shallow(< CountrySelect selectOptions={[]}/>)
    expect(toJson(wrapper)).toMatchSnapshot();
  })

  it('Selecting a country triggers event on parent component', () => {
    const { enzymeWrapper, props } = setup()
    const selector = enzymeWrapper.find('Select')
    expect(selector.props().value).toEqual({
      "label": "Select a country", "value": ""
    })
    let selectedOption = {value: 'uk', label: 'United Kingdom' }
    selector.props().onChange(selectedOption)
    expect(props.onChange.mock.calls.length).toEqual(1)
    expect(props.onChange.mock.calls[0][0]).toEqual(selectedOption)
  })
})
