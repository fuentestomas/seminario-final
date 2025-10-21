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

    getSearchWorkers(req) {
        const category = req.query.categoryFilter;
        const proximity = req.query.proximityFilter;
        const rawSearchText = req.query.searchText;

        const query = {};

        if (category) {
            if (typeof category === 'string' && category.indexOf(',') !== -1) {
                const ids = category.split(',').map(c => c.trim()).filter(Boolean);
                query.categories = { $in: ids };
            } else {
                query.categories = category;
            }
        }

        // if (proximity) {
        //     query.proximity = proximity;
        // }

        let searchText = null;
        if (rawSearchText) {
            try {
                searchText = decodeURIComponent(rawSearchText);
            } catch (e) {
                searchText = rawSearchText;
            }
        }

        if (searchText) {
            query.$or = [
                { fullName: { $regex: searchText, $options: 'i' } },
                { description: { $regex: searchText, $options: 'i' } }
            ];
        }

        console.log('Search workers query:', JSON.stringify(query));

        let result = model.find(query).exec();

        return result;
    }

    update(id, newData) {
        let result = model.findByIdAndUpdate(id, newData, { returnDocument: 'after' })
            .then((result) => {
                return result;
            });

        return result;
    }

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