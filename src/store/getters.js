/**
 * Created by chenjz on 2017/7/31.
 */
'use strict'

import { kindOf } from '@/utils'

export const getUserid = state => {
  return kindOf(state.userinfo) === 'object'
    ? state.userinfo.id
    : ''
}

export const currentChatroom = state => {
  return state.currentContactID
    ? state.contacts[state.currentContactID]
    : null
}
