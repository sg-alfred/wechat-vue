/**
 * Created by chenjz on 2017/8/2.
 */
'use strict'

//
module.exports = (response, respObj) => {
    response.writeHead(200, {'Content-type': 'application/json'})
    response.end(respObj)
}
