import { get, post, put, del } from '../data/api.js';

export async function getAllProducts() {
    return get('/data/products?sortBy=_createdOn%20desc');
}

export async function createProduct(product) {
    return post('/data/products', product);
}

export async function getProduct(id) {
    return get(`/data/products/${id}`);
}

export async function deleteProduct(id) {
    return del(`/data/products/${id}`);
}

export async function editProduct(id, product) {
    return put(`/data/products/${id}`, product);
}

export async function buy(productId) {
    return post('/data/bought', {productId});
}

export async function totalBoughtCount(productId) {
    return get(`/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`);
}

export async function userBought(userId, productId) {
    return get(`/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
