import * as crud from './api.js';
import { homePage } from '../views/homePage.js';

const host = 'http://localhost:3030';
crud.settings.host = host;

export const login = crud.login;
export const registerGuest = crud.register;
export const logout = crud.logout;

export async function getFurniture() {
    return await crud.get(host + '/data/catalog');
}

export async function getItemById(id) {
    return await crud.get(host + '/data/catalog/' + id);
}

export async function getMyFurnitures() {
    const userID = sessionStorage.getItem('userID');
    return await crud.get(host + `/data/catalog?where=_ownerId%3D%22${userID}%22`);
}

export async function creatFurniture(data) {
    return await crud.post(host + '/data/catalog', data);
}

export async function updateFurniture(id, data) {
    return await crud.put(host + '/data/catalog/' + id, data);
}

export async function deleteItem(id) {
    return await crud.del(host + '/data/catalog/' + id);
}


export function setUserNav() {
    const token = sessionStorage.getItem('authToken');
    if (token !== null) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';

    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
        
    }
}

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    homePage('/');

});