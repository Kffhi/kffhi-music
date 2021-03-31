/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as fetch from 'dva/fetch'

const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})

function get(url: any) {
    return fetch(url, {
        method: 'GET',
        headers: headers
    })
        .then((response: any) => {
            return handleResponse(url, response)
        })
        .catch((error: any) => {
            console.error(`Request failed. Url = ${url}. Message = ${error}`)
            return Promise.reject({ error: { message: 'Request failed.' } })
        })
}

function post(url: any, data: any) {
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
        .then((response: any) => {
            return handleResponse(url, response)
        })
        .catch((error: any) => {
            console.error(`Request failed. Url = ${url}. Message = ${error}`)
            return Promise.reject({ error: { message: 'Request failed.' } })
        })
}

function handleResponse(url: any, response: { status: number; json: () => any }) {
    if (response.status === 200) {
        return response.json()
    } else {
        console.error(`Request failed. Url = ${url}`)
        return Promise.reject({ error: { message: 'Request failed due to server error' } })
    }
}

export { get, post }
