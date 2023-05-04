import { get, post, put, del } from '../data/api.js';

export async function getAllMemes() {
    return get('/data/memes?sortBy=_createdOn%20desc');
}

export async function createMeme(meme) {
    return post('/data/memes', meme);
}

export async function getMeme(id) {
    return get(`/data/memes/${id}`);
}

export async function deleteMeme(id) {
    return del(`/data/memes/${id}`);
}

export async function editMeme(id, meme) {
    return put(`/data/memes/${id}`, meme);
}

export async function getUserMemes(userId){
    return get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}
