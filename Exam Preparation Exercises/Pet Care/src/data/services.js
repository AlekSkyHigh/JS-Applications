import { get, post, put, del } from '../data/api.js';

export async function getAllPets() {
    return get('/data/pets?sortBy=_createdOn%20desc&distinct=name');
}

export async function createPostcard(pet) {
    return post('/data/pets', pet);
}

export async function getPet(id) {
    return get(`/data/pets/${id}`);
}

export async function deletePet(id) {
    return del(`/data/pets/${id}`);
}

export async function editPet(id, pet) {
    return put(`/data/pets/${id}`, pet);
}

export async function donate(petId) {
    return post('/data/donation', {petId});
}

export async function getDonations(petId) {
    return get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
}

export async function userDonated(userId, petId) {
    return get(`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
