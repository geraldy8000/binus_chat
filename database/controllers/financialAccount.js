var financialAccount = require('../models').financialAccount;

module.exports = {
    listAll(req,res){
        return financialAccount
            .all()
            .then( (com) => res.status(201).send(com))
            .catch(error => res.status(400).send(error));
    },
    list(req,res){
        return financialAccount
            .findOne({where: {student_id: req.params.student_id}})
            .then( (com) =>  res.status(200).send(com) )
            .catch( (error) => res.status(200).send(error) );
    },
    insertNewData(req,res){
        return financialAccount
            .create({
                student_id: req.params.student_id,
                virtual_account: req.body.virtual_account,
                bank_account: req.body.bank_account
            })
            .then( (com) => res.status(201).send(com))
            .catch(error => res.status(400).send(error));
    },

    getTotalCharge(){
        return financialAccount
            .sum('charge', {where:{student_id:1701319823}})
    },

    getBankAccount(uid){
        return financialAccount
            .findOne({where: {student_id:uid}})
            
    }
};
