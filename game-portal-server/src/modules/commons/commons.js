export const createRandomID = length => {

    const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const CHARACTERSLENGTH = CHARACTERS.length;
    const IDlength = length ? length : 4

    let result = '';

    for (let i = 0; i < IDlength; i++) {
        result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERSLENGTH));
    }

    return result;

}
