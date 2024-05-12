import Toastify from '@lib/toastify';

class Toast {

    // Toastify Messages
    error(message, duration = 3000) {
        Toastify({
            text: message,
            duration: duration,
            close: true,
            gravity: 'top',
            position: 'center',
            style: {
                background: 'linear-gradient(to right, #ff4b2b, #ff416c)'
            }
        }).showToast();
    }

    success(message, duration = 3000) {
        Toastify({
            text: message,
            duration: duration,
            close: true,
            gravity: 'top',
            position: 'center',
            style: {
                background: 'linear-gradient(to right, #00b09b, #96c93d)'
            }
        }).showToast();
    }

    info(message, duration = 3000) {
        Toastify({
            text: message,
            duration: duration,
            close: true,
            gravity: 'top',
            position: 'center',
            style: {
                background: 'linear-gradient(to right, #007991, #78ffd6)'
            }
        }).showToast();
    }

    warn(message, duration = 3000) {
        Toastify({
            text: message,
            duration: duration,
            close: true,
            gravity: 'top',
            position: 'center',
            style: {
                background: 'linear-gradient(to right, #ff4b2b, #ff416c)'
            }
        }).showToast();
    }
}

export default Toast;