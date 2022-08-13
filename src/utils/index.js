export * from './constants';


export const setItemInLocalStorage = (key, value) => {
    if(!key || !value){
        console.error('Can not store token in localStorage');
        return;
    }

    const valueToStore = typeof value !== 'string' ? JSON.stringify(value) : value;

    localStorage.setItem(key, valueToStore);
};


export const getItemFromLocalStorage = (key) => {
    if(!key){
        console.error('Can not get token from localStorage');
        return;
    }

    localStorage.getItem(key);
};


export const removeItemFromLocalStorage = (key) => {
    if(!key){
        console.error('Can not remove token from localStorage');
        return;
    }

    localStorage.removeItem(key);
};


export const getFormBody = (params) => {
    let formBody=[];

    for(let property in params){
        let encodedKey=encodeURIComponent(property);    // 'user name' => 'user%20name'
        let encodedValue=encodeURIComponent(params[property]);     //'abhi 123' => 'abhi%20123'

        formBody.push(encodedKey + '=' + encodedValue);
    }

    return formBody.join('&');      //returns the array as a string seperated by '&'
};