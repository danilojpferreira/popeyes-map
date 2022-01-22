/* eslint-disable @typescript-eslint/ban-ts-comment */
import renderer from 'react-test-renderer'
import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import { Loading } from '../app/components'
import { store } from '../app/store'
import { setLoading } from '../app/store/actions/configurationsActions'

Enzyme.configure({ adapter: new Adapter() })

const base = (
  <Provider store={store}>
    <Loading />
  </Provider>
)

describe('<Loading />', () => {
  // @ts-ignore
  store.dispatch(setLoading(true))
  it('Should render correctly', () => {
    const component = renderer.create(base)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Should have at one children', () => {
    const component = shallow(base)
    expect(component.find('.loading').children.length).toBe(1)
  })
})
