import { get, post, put, del } from '../data/api.js';

export async function getAllAlbums() {
    return get('/data/albums?sortBy=_createdOn%20desc');
}

export async function createAlbum(album) {
    return post('/data/albums', album);
}

export async function getAlbum(id) {
    return get(`/data/albums/${id}`);
}

export async function editAlbum(id, album) {
    return put(`/data/albums/${id}`, album);
}

export async function deleteAlbum(id) {
    return del(`/data/albums/${id}`);
}

export async function addLike(albumId) {
    return post('/data/likes', {albumId});
}

export async function getLikes(albumId) {
    return get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`);
}


export async function userLikesAlbum(userId, albumId) {
    return get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
