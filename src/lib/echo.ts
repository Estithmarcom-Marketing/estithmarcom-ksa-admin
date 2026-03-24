import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import Cookies from "js-cookie";

declare global {
    interface Window {
        Pusher: typeof Pusher;
    }
}

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    // wssPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: false,
    enabledTransports: ['ws'],

    authEndpoint: `${import.meta.env.VITE_WS_URL}/broadcasting/auth`,
    auth: {
        headers: {
            Authorization: `Bearer ${Cookies.get("mithaq-admin")}`,
            "Content-Type": "Application/json",
            "Accept": "Application/json"
        },
    },
});

export default echo;