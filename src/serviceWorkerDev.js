import { BASE_URL, SERVICE_WORKER_URL, WEB_PUSH_PUBLIC_KEY } from "./config";
// import { useSendNotificationMutation } from "./services/notesApi";

export const base64ToUint8Array = (base64) => {
    const padding = "=".repeat((4 - (base64.length % 4)) % 4);
    const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(b64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};


export default async function serviceWorkerDev() {

    try {
        const registration = await navigator.serviceWorker.register(
            SERVICE_WORKER_URL
        );
        console.log({ registration });

        // const subscription = await registration.pushManager.getSubscription();
        // console.log({ subscription });

        // if (!subscription) {
        //     const subscription = await registration.pushManager.subscribe({
        //         userVisibleOnly: true,
        //         applicationServerKey: base64ToUint8Array(WEB_PUSH_PUBLIC_KEY),
        //     });
        // }
        // if (Notification.permission === "granted") {



        //     const response = await fetch(`${BASE_URL}api/v1/users/subscribe`, {
        //         method: 'POST', // or 'PUT'
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(subscription),
        //     })
        //     const data = await response.json()
        //     console.log(data)

        // }


    } catch (error) {
        console.log(error)
    }
}
