import React, { Component } from 'react';
import { connect } from 'react-redux';
import CountryPerformanceOnRisk from './CountryPerformanceOnRisk';
import SourceOfInfection from './SourceOfInfection';
import '../css/temp.css' //this is temp import - needs to be removed for bundle

import Highlighter from 'react-highlight-words'
import Select from 'react-select';
import Loader from 'halogen/BounceLoader'
import 'react-select/dist/react-select.css';


export class CountryPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedASN: undefined,
      inputValue: '',
      spinner: '0px'
    }
  }


  onChange(asn) {
    this.setState({
      selectedASN: asn,
      spinner: '20px'
    });
    if (asn.value) {
      window.location = `/asn/${asn.value}`
    }
  }


  optionRenderer(option) {
    if(!option.label){ return }
    return (
      <Highlighter
        searchWords={[this.state.inputValue]}
        textToHighlight={option.label}
      />
    );
  }


  setInputValue(value) {
    this.setState({
      inputValue: value
    })
  }


  render() {
    const selectOptions = Object.values(this.props.asn).map(asn => {
      return {
        value: asn.number,
        label: asn.title
      }
    })
    let spinnerStyle = { padding:'20px', margin: 'auto', width:'10%'}
    selectOptions.unshift({value: '', label: 'Select an AS'})
    return (
      <div>
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <Select
              name="asn-selector"
              value={this.state.selectedASN || selectOptions[0]}
              options={selectOptions}
              onChange={this.onChange.bind(this)}
              onInputChange={this.setInputValue.bind(this)}
              optionRenderer={this.optionRenderer.bind(this)}
            />
            <div style={spinnerStyle}>
              <Loader size={this.state.spinner} color='#00D49A'/>
            </div>
          </div>
        </div>
        {Object.keys(this.props.views).map((key, idx) => {
          return (
            <div key={key} className="row">
              <div className="col-md-6 panel panel-default">
                <CountryPerformanceOnRisk view={this.props.views[key]} viewId={key}/>
              </div>
              <div className="col-md-6 panel panel-default">
                <SourceOfInfection view={this.props.views[key]} viewId={key+idx}/>
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    views: state.countryPerformanceOnRiskViews,
    asn: state.entities.asn
  }
}


export default connect(mapStateToProps)(CountryPage)
