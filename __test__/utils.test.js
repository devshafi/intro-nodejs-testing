const { validatePhoneNumber } = require("../helper/utils");

it("should return false if non number string is passed", () => {
    expect(validatePhoneNumber("onetwothree")).toBe(false);
});

test("it returns false when a string argument is passed", () => {
    expect(validatePhoneNumber("onetwothree")).toBe(false);
});

describe("Validate Phone Number", () => {
    describe("when valid phone number is passed", () => {
        it("should return true for a valid Bangladeshi phone number", () => {
            const phoneNumber = "01622971272";
            expect(validatePhoneNumber(phoneNumber)).toBe(true);
        });

        it('should return true for a valid Bangladeshi phone number wth the "+" sign', () => {
            const phoneNumber = "+8801622971272";
            expect(validatePhoneNumber(phoneNumber)).toBe(true);
        });
        it('should return true for a valid Bangladeshi phone number without the "+" sign', () => {
            const phoneNumber = "8801622971272";
            expect(validatePhoneNumber(phoneNumber)).toBe(true);
        });

        it('should return true for a valid Bangladeshi phone number the "0088" prefix', () => {
            const phoneNumber = "008801622971272";
            expect(validatePhoneNumber(phoneNumber)).toBe(true);
        });
    });

    describe("when invalid phone number is passed", () => {
        it("should return false for an invalid phone number", () => {
            const phoneNumber = "+8801234";
            expect(validatePhoneNumber(phoneNumber)).toBe(false);
        });

        it("should return false for a phone number with an incorrect digit", () => {
            const phoneNumber = "+88012345678A";
            expect(validatePhoneNumber(phoneNumber)).toBe(false);
        });

        it("should return false for a phone number with more than 11 digits", () => {
            const phoneNumber = "+88012345678901";
            expect(validatePhoneNumber(phoneNumber)).toBe(false);
        });

        it("should return false for a phone number with less than 11 digits", () => {
            const phoneNumber = "+88012345678";
            expect(validatePhoneNumber(phoneNumber)).toBe(false);
        });
    });
});
