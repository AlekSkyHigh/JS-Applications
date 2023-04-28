import { get, post, put, del } from '../data/api.js';

export async function getAllPosts() {
    return get('/data/posts?sortBy=_createdOn%20desc');
}

export async function createPost(poster) {
    return post('/data/posts', poster);
}

export async function getPost(id) {
    return get(`/data/posts/${id}`);
}

export async function deletePost(id) {
    return del(`/data/posts/${id}`);
}

export async function editPost(id, post) {
    return put(`/data/posts/${id}`, post);
}

export async function getUserPosts(userId){
    return get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function donate(postId) {
    return post('/data/donations', {postId});
}

export async function totalDonationsCountForPost(postId) {
    return get(`/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`);
}

export async function userDonation(userId, postId) {
    return get(`/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
