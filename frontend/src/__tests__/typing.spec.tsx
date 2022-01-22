/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import renderer from 'react-test-renderer'
import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Typing } from '../app/components'

Enzyme.configure({ adapter: new Adapter() })

const sentences = ['']

const base = <Typing onFinish={() => null} sentences={sentences} />

describe('<Typing />', () => {
  // @ts-ignore
  it('Should render correctly', async () => {
    const component = renderer.create(base)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Should render a label omponent', () => {
    const component = shallow(base)
    expect(component.find('.typing').text()).toEqual('')
  })
})
