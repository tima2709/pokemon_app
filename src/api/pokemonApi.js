export const baseURL = 'https://api.pokemontcg.io/v2';

export const getQueryString = (queryParams) => {
    let string = '';

    if (queryParams.length) {
        string = `?${queryParams
            .map((x) => `${x.key}=${x.value}`)
        .join('&')}`;
    }
    return string;
};