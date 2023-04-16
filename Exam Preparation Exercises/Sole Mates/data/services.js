import { get, post, put, del } from '../data/api.js';

export async function getAllProducts() {
    return get('/data/shoes?sortBy=_createdOn%20desc');
}

export async function createProduct(product) {
    return post('/data/shoes', product);
}

export async function getProduct(id) {
    return get(`/data/shoes/${id}`);
}

export async function deleteProduct(id) {
    return del(`/data/shoes/${id}`);
}

export async function editProduct(id, product) {
    return put(`/data/shoes/${id}`, product);
}

export async function searchProducts(query) {
    return get(`/data/shoes?where=brand%20LIKE%20%22${query}%22`);
}
