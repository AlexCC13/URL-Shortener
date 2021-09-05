/* eslint no-unused-vars: 1 */

import React, { useCallback, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import validUrl from 'valid-url';

const ShortenUrlForm = () => {
    const [value, setValue] = useState('');

    const state = {
        url: '',
        link: '',
    };

    const onChange = useCallback(
        (e) => {
            setValue(e.target.value);
            console.log(e.target.value);
            state.url = e.target.value;
        },
        [
            /* TODO: Add necessary deps */
        ],
    );


    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const validURL = validUrl.isUri(state.url, {
                require_protocol: true
            });
            if (!validURL) {
                alert('Please ensure this url is correct and includes the http protocol');
            } else {
                console.log('URL is:', state.url)            
            }
            axios.post('http://localhost:3001/api/shorten', {
                url: state.url
            })
            .then( res => {
                console.log(res.data.hash);
                setValue(`http://localhost:3001/${res.data.hash}`)
            })
            .catch( error => {
                console.error(error.response.data);
            })
        },
        [
            /* TODO: necessary deps */
        ],
    );
    

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="shorten">
                Url:
                <input
                    placeholder="Url to shorten"
                    id="shorten"
                    type="text"
                    value={value}
                    onChange={onChange}
                />
            </label>
            <input type="submit" value="Shorten and copy URL"/>
                <span id="result">{ state.link } </span>
            <div>
                <CopyToClipboard text={value}>
                    <button type="button">Copy to clipboard</button>
                </CopyToClipboard>
            </div>
        </form>
    );
};

export default ShortenUrlForm;
