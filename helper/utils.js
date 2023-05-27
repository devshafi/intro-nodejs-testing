exports.validatePhoneNumber = (phoneNumber) => {
    const regex = /^(?:\+?88|0088)?01[15-9]\d{8}$/;
    const isValid = regex.test(phoneNumber);
    return isValid;
};
