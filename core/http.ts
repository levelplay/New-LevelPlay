import axios from 'axios';
import cookies from "js-cookie";

const ax = axios.create({baseURL: `${process.env.NEXT_PUBLIC_API_URL}api`});
// @ts-ignore: Unreachable code error
export const fetcher = (...args: any) => ax(...args).then(res => res.data)

export const httpGet = (url: string)=>{
    return new Promise(async (resolve, reject)=>{
        ax.get(url, {headers: {...authHeader()} }).then(e=>{
                resolve(e.data);
        }).catch((e)=>{
            if(e.response.status  != 401){
                reject(getErrorString(e));
                return;
            }
            refrechToken().then(e=>{
                ax.get(url, {headers: {...authHeader()} }).then(e=>{
                    resolve(e.data);
                }).catch((e)=>{
                    reject(getErrorString(e));
                });
            }).catch(e=>{
                reject('Unauthorized');
            })
        });
    })
}

const getErrorString=(e: any, url='') =>{
    if(url=='/login'){
        return 'Invalid email and password';
    }
    if(e?.response?.data?.message){
        return e?.response?.data?.message || '';
    }
    if(typeof e?.response?.data == 'string'){
        return e?.response?.data.replace(/(<([^>]+)>)/ig, '').replace('Error', '').trim();
    }
    return e.message;
}

export const httpPost = (url: string, data: any)=>{
    return new Promise(async (resolve, reject)=>{
        ax.post(url, data,{headers: {...authHeader()} }).then(e=>{
            resolve(e.data);
        }).catch((e)=>{
            if(e.response.status != 401){
                reject(getErrorString(e, url));
                return;
            }
            refrechToken().then(e=>{
                ax.post(url, data,{headers: {...authHeader()} }).then(e=>{
                    resolve(e.data);
                }).catch((e)=>{
                    console.log(e);
                    reject(getErrorString(e));
                });
            }).catch(e=>{
                reject('Unauthorized');
            })
        });
    })
}
export const httpPut = (url: string, data: any)=>{
    return new Promise(async (resolve, reject)=>{
        ax.put(url, data,{headers: {...authHeader()} }).then(e=>{
            resolve(e.data);
        }).catch((e)=>{
            if(e.response.status != 401){
                reject(getErrorString(e));
                return;
            }
            refrechToken().then(e=>{
                ax.put(url, data,{headers: {...authHeader()} }).then(e=>{
                    resolve(e.data);
                }).catch((e)=>{
                    console.log(e);
                    reject(getErrorString(e));
                });
            }).catch(e=>{
                reject('Unauthorized');
            })
        });
    })
}

export const httpDelete = (url: string)=>{
    return new Promise(async (resolve, reject)=>{
        ax.delete(url, {headers: {...authHeader()} }).then(e=>{
            resolve(e.data);
        }).catch((e)=>{
            if(e.response.status != 401){
                reject(getErrorString(e));
                return;
            }
            refrechToken().then(e=>{
                ax.delete(url,{headers: {...authHeader()} }).then(e=>{
                    resolve(e.data);
                }).catch((e)=>{
                    reject(getErrorString(e));
                });
            }).catch(e=>{
                reject('Unauthorized');
            })
        });
    })
}

export const refrechToken =() =>{
    return new Promise((resolve, reject)=>{
        const token = localStorage.getItem('refreshToken');
        ax.post('/refresh', {token: token||''}).then(e=>{
            if(e.status == 200){
                localStorage.setItem('token', e.data.token);
                localStorage.setItem('refreshToken', e.data.refreshToken);
                resolve(e)
            }else{
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                cookies.remove('token');
                cookies.remove('refreshToken');
                location.reload();
            }
        }).catch((e)=>{
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            cookies.remove('token');
            cookies.remove('refreshToken');
            location.reload();
        })
    });
}

const authHeader = ()=>{
    const token = localStorage.getItem('token');
    return {Authorization: token};
}