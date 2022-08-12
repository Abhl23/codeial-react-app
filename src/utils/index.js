export * from './constants';

export const getFormBody = (params) => {
    let formBody=[];

    for(let property in params){
        let encodedKey=encodeURIComponent(property);    // 'user name' => 'user%20name'
        let encodedValue=encodeURIComponent(params[property]);     //'abhi 123' => 'abhi%20123'

        formBody.push(encodedKey + '=' + encodedValue);
    }

    return formBody.join('&');      //returns the array as a string seperated by '&'
};