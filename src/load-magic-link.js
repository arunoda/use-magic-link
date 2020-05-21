import EventEmitter from 'event-emitter';

const events = new EventEmitter();
let MagicSDK = null;
let script = null;
let sdk = null;

export default async function loadMagicLink(key) {
    if (sdk) {
        return sdk;
    }

    if (key && MagicSDK) {
        sdk = new MagicSDK(key)
        return sdk;
    }

    if (!script) {
        script = window.document.createElement('script');
        script.async = true;
        script.src = 'https://cdn.jsdelivr.net/npm/magic-sdk/dist/magic.js';
        script.id = 'magic-link-sdk';
        script.onload = () => {
            MagicSDK = window.Magic;
            events.emit('loaded');
        }
        
        document.head.appendChild(script);
    }

    if (!key) {
        return
    }

    return new Promise((resolve) => {
        events.once('loaded', () => {
            if (sdk) {
                resolve(sdk)
                return;
            }
            
            sdk = new MagicSDK(key);
            resolve(sdk);
        })
    })
}