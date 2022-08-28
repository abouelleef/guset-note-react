
const SERVICE_WORKER_URL = `${process.env.PUBLIC_URL}/serviceWorker.js`;

const WEB_PUSH_PUBLIC_KEY = process.env.REACT_APP_WEB_PUSH_PUBLIC_KEY
const BASE_URL = process.env.REACT_APP_BASE_URL


export {
    SERVICE_WORKER_URL,
    WEB_PUSH_PUBLIC_KEY,
    BASE_URL
}