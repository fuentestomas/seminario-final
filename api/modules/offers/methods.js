const model = require('./model');
const chatModel = require('../chat/model');
const scoresModel = require('../scores/model');
const usersModel = require('../users/model');

class ModelMethods {

    create(data) {
        let result = model.create(data)
            .then((res) => {
                return res;
            })
        
        return result;
    }
    
    async getById(id) {
        let result = await model.findById(id)
            .populate(['workerId', 'employerId'])
            .then((result) => {
                return result;
            });

        if (result) {
            let chat = await chatModel.findOne({
                employerId: result.employerId._id,
                workerId: result.workerId._id
            })
            .then((res) => {
                return res ? res._id : null;
            });

            result.chatId = chat;
        }
        
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

    async getEmployerOffers(userId) {
        let allUserOffers = await model.find({ employerId: userId })
            .populate('workerId')
            .then((res) => {
                return res;
            });

        console.log('All user offers before adjustment:', allUserOffers);
        
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

    async getWorkerOffers(userId) {
        let indirectOffers = await model
            .find({
                status: 'open',
            })
            .populate('employerId')
            .then((res) => {
                return res;
            });
        
        let pendingOffers = await model
            .find({
                workerId: userId,
                status: 'pending'
            })
            .populate('employerId')
            .then((res) => {
                return res;
            });

        let acceptedOffers = await model
            .find({
                workerId: userId,
                status: {$in: ['completed', 'inProgress']}
            })
            .populate('employerId')
            .then((res) => {
                return res;
            });

        let toReturn = {
            indirectOffers: indirectOffers,
            pendingOffers: pendingOffers,
            acceptedOffers: acceptedOffers
        }

        console.log('Worker offers to return:', toReturn);

        return toReturn;
    }

    update(id, newData) {
        let result = model.findByIdAndUpdate(id, newData, { returnDocument: 'after' })
            .then((result) => {
                return result;
            });
        
        return result;
    }

    async completeWork(id, scoreData) {
        let result = await model.findByIdAndUpdate(id, { status: 'completed' }, { returnDocument: 'after' })
            .then(async (result) => {
                await scoresModel.create(scoreData);
                let receiverScores = await scoresModel.find({ receiverId: scoreData.receiverId });
                
                let sumScore = 0;
                for (let i = 0; i < receiverScores.length; i++) {
                    sumScore += receiverScores[i].rate;
                }
                let averageScore = sumScore / receiverScores.length;
                console.log('New average score for user', scoreData.receiverId, ':', averageScore);
                await usersModel.findByIdAndUpdate(scoreData.receiverId, { $set: { avgScore: averageScore } });
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