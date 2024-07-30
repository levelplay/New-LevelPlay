export const constructURL = (baseURL: string, parameters: any): string => {
    const url = new URL(baseURL, 'http://example.com'); // Use a dummy base URL

    Object.keys(parameters).forEach(key => {
        const value = parameters[key];
        if (value) {
            url.searchParams.append(key, value.toString());
        }
    });

    return `${url.pathname}${url.search}`;
};