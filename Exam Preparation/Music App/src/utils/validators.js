export const albumIsInvalid = (albumData) => {
    let requiredFields = ['name', 'imgUrl', 'price', 'releaseDate', 'artist', 'genre', 'description'];

    return requiredFields.some(x => !albumData[x])
}