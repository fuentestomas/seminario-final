const model = require('./model');

class ModelMethods {

    create(data) {
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

    getEmployerOffers(userId) {
        let allUserOffers = model.find({ employerId: userId })
            .then((res) => {
                return res;
            });
        
        let acceptedOffers = model
            .find({
                employerId: userId,
                status: {$in: ['completed', 'inProgress']}
            })
            .populate('workerId')
            .then((res) => {
                return res;
            });

        let toReturn = {
            offers: allUserOffers,
            acceptedOffers: acceptedOffers
        }
        return toReturn;
    }

    getWorkerOffers(userId) {
        let allUserOffers = model.find({ workerId: userId })
            .then((res) => {
                return res;
            });
        
        let indirectOffers = model
            .find({
                status: 'open',
            })
            .populate('employerId')
            .then((res) => {
                return res;
            });
        
        let pendingOffers = model
            .find({
                workerId: userId,
                status: 'pending'
            })
            .then((res) => {
                return res;
            });

        let acceptedOffers = model
            .find({
                workerId: userId,
                status: {$in: ['completed', 'inProgress']}
            })
            .populate('employerId')
            .then((res) => {
                return res;
            });

        let toReturn = {
            offers: allUserOffers,
            indirectOffers: indirectOffers,
            pendingOffers: pendingOffers,
            acceptedOffers: acceptedOffers
        }

        return toReturn;
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