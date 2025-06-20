//require('dotenv').config()
const model = require('./model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class ModelMethods {

    async login(data) {
        let user = await model.findOne({ emailAddress: data.emailAddress }).lean()
            .then((result) => {
                return result;
            })
            .catch((e) => {
                console.log(e);
            })

        if (user && bcrypt.compareSync(data.password, user.password)) {
            const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1y' });
            user.token = token;
            return user
        }
        else {
            const error = new Error();
            error.status = 401;
            error.message = user ? 'Contraseña incorrecta' : 'Usuario no existe';
            return error;
        }
    }
    
    async create(data) {
        const salt = bcrypt.genSaltSync(10);

        const hashedPassword = await bcrypt.hash(data.password, salt);
        
        data.password = hashedPassword;

        let result = model.create(data)
            .then((res) => {
                return res;
            })
        
        return result;
    }
    
    getById(id) {
        let result = model.findById(id)
            .then((result) => {
                return result;
            });
        
        return result;
    };

    getAll(filters, populates) {
        if (arguments.length == 0) {
            filters = {};
            populates = {};
        }
        
        let result = model.find()
            .then((result) => {
                return result;
            });
        
        return result;
    };

    update(id, newData) {
        let result = model.findByIdAndUpdate(id, newData, { returnDocument: 'after' })
            .then((result) => {
                return result;
            });
        
        return result;
    }

    delete(id) {
        let result = model.findByIdAndDelete(id)
            .then((result) => {
                return result;
            });
        
        return result;
    }

}

module.exports = {
    ModelMethods
};