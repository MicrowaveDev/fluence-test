const { krasnodar } = require('@fluencelabs/fluence-network-environment');
const { FluencePeer } = require("@fluencelabs/fluence");

const dhtApi = require('./dht-api');
const geesomeCrypto = require('./geesome-crypto');

export default {
    template: '<div>loaded: {{loaded}}</div>',
    async created() {
        const peer = new FluencePeer();

        await peer.start({
            connectTo: krasnodar[1],
        });

        this.loaded = true;

        dhtApi.findSubscribers(peer, 'test').then(r => {
            console.log('findSubscribers', r);
        });
        geesomeCrypto.registerClientAPI(peer, 'api', {
            receive_event: (topic, e) => {
                console.log('receive_event', topic, e);
            }
        });
        geesomeCrypto.registerGeesomeCrypto(peer, 'GeesomeCrypto', {
            checkSignature: (from, data, seqno, signature) => {
                console.log('checkSignature', from, data, seqno, signature);
            }
        });
    },
    data() {
        return {
            loaded: false
        }
    }
}