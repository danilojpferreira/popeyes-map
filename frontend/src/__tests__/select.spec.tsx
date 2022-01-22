/* eslint-disable @typescript-eslint/ban-ts-comment */
import renderer from 'react-test-renderer'
import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Select } from '../app/components'

Enzyme.configure({ adapter: new Adapter() })

const base = (
  <Select
    label="Select me"
    options={[
      {
        value: 'Home',
        label: 'home',
      },
      {
        value: 'Car',
        label: 'car',
      },
    ]}
    selected="car"
    onSelect={() => null}
  />
)

describe('<Select />', () => {
  // @ts-ignore
  it('Should render correctly', () => {
    const component = renderer.create(base)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Should render a label, and input with value', () => {
    const component = shallow(base)
    expect(component.find('.select').text()).toEqual('Select mehomecar')
  })
})
