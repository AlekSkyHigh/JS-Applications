import { get, post, put, del } from '../data/api.js';

export async function getAllFruits() {
    return get('/data/fruits?sortBy=_createdOn%20desc');
}

export async function createFruit(fruit) {
    return post('/data/fruits', fruit);
}

export async function getFruit(id) {
    return get(`/data/fruits/${id}`);
}

export async function deleteFruit(id) {
    return del(`/data/fruits/${id}`);
}

export async function editFruit(id, fruit) {
    return put(`/data/fruits/${id}`, fruit);
}

export async function searchFruits(query) {
    return get(`/data/fruits?where=name%20LIKE%20%22${query}%22`);
}

// export async function buy(productId) {
//     return post('/data/bought', {productId});
// }

// export async function totalBoughtCount(productId) {
//     return get(`/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`);
// }

// export async function userBought(userId, productId) {
//     return get(`/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
// }
