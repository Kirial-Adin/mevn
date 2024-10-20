module.exports = class UserDto {
    id;
    email;
    token;
    


    constructor(model) {
        this.id = model._id
        this.email = model.email
        this.token = model.token
    }
}