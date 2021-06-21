
import axios from 'axios';

export default {
    getData: () =>
    axios({
        'method':'GET',
        'url':'http://localhost:4000/profile',
        'headers': {
            'content-type':'application/json',
            'token': 'kgjhadjkljklasdjkljkladsjkldasjkjkadskjbads'
        },
        'params': {
            'search':'parameter',
        },
    })
}