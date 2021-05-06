import 'jest'
import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'

import Information from '..'

describe('First Test', () => {
    it('Information', () => {
        const info = {
            url: '',
            title: '标题',
            description: '描述'
        }
        const wrapper: ReactTestRenderer = renderer.create(<Information modal={false} info={info} handleClose={() => { return }} />)
        expect(wrapper.root.children.length).toBe(1)
    })
})
