import { APP_NAME } from '@config';
import { appDefault } from '@core/conf/defaultSettings';

class Storage {
    get(){
        const data = localStorage.getItem(APP_NAME);
        if (data) {
            return JSON.parse(data);
        } else {
            localStorage.setItem(APP_NAME, JSON.stringify(appDefault));
            return appDefault;
        }
    }

    set(key, value){
        const appData = this.get();
        appData[key] = value;
        this.save(appData);
    }

    save(data){
        localStorage.setItem(APP_NAME, JSON.stringify(data));
    }
}

export default Storage;