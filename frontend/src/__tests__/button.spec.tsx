/* eslint-disable no-alert */
import renderer from 'react-test-renderer'
import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Button } from '../app/components'

Enzyme.configure({ adapter: new Adapter() })

const base = <Button text="click me" onClick={() => alert('true')} />

describe('<Button />', () => {
  it('Should render correctly', () => {
    const component = renderer.create(base)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Should have single <button>', () => {
    const component = shallow(base)
    expect(component.find('button').length).toBe(1)
  })

  it('Should have onClick prop', () => {
    const component = shallow(base)
    expect(component.find('button').prop('onClick'))
  })

  it('Should have text child', () => {
    const component = shallow(base)
    expect(component.find('button').childAt(0).text()).toEqual('click me')
  })
})
