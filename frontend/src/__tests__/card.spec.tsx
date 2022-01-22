/* eslint-disable no-alert */
import renderer from 'react-test-renderer'
import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Card } from '../app/components'

Enzyme.configure({ adapter: new Adapter() })

const base = (
  <Card>
    <p>test</p>
  </Card>
)

describe('<Card />', () => {
  it('Should render correctly', () => {
    const component = renderer.create(base)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Should have at least on children', () => {
    const component = shallow(base)
    expect(component.find('.card').children().length).toBeGreaterThan(0)
  })
})
