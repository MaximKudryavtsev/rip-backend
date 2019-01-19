export const isPasswordsEquals = (password: string, repeatPassword: string): boolean => {
    return password === repeatPassword;
};

export const isPasswordValid = (password: string): boolean => {
    const PASSWORD_LENGTH = 5;
    return password.length > PASSWORD_LENGTH;
};

export const isPasswordsValid = (password: string, repeatPassword: string): boolean => {
    return isPasswordValid(password) && isPasswordValid(repeatPassword) && isPasswordsEquals(password, repeatPassword);
};

export const parseResponse = (data: object) => {
    return JSON.parse(JSON.stringify(data));
};

export const getAvatarLink = (id: string, name: string): string => {
    return `${process.env.IMAGE_STORAGE}/avatar/${id}/${name}`;
};
