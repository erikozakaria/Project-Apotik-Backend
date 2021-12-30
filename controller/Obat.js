const obatModel = require('../model/Obat')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId
const { deleteImage } = require('../uploadConfig')
exports.insertObat = (data) =>
    new Promise((resolve, reject) => {
        obatModel.create(data)
        .then(() => resolve(requestResponse.sukses('Obat Nya Sudah Terinput')))
        .catch(() => reject(requestResponse.serverError))
    })

 exports.getAllObat = () =>
    new Promise((resolve, reject) => {
        obatModel.find({})
        .then(obat => resolve(requestResponse.suksesWithData(obat)))
        .catch(error => reject(requestResponse.serverError))
    })

exports.getbyId = (id) =>
    new Promise((resolve, reject) => {
        obatModel.findOne({
            _id: id
        }).then(obat => resolve(requestResponse.suksesWithData(obat)))
        .catch(error => reject(requestResponse.serverError))
    })

exports.edit = (data, id, changeImage) =>
    new Promise((resolve, reject) => {
        obatModel.updateOne({
            _id: objectId(id)
        }, data)
        .then (() => {
            if (changeImage) {
                deleteImage(data.oldImage)
            }
            resolve(requestResponse.sukses('Obat Sudah Di Edit'))
        }).catch(() => reject(requestResponse.serverError))
    })

exports.delete = (id) =>
    new Promise((resolve, reject) => {
        obatModel.findOne({
            _id: objectId(id)
        }).then(obat => {
            obatModel.deleteOne({
                _id: objectId(id)
            }).then(() => {
                deleteImage(obat.image)
                resolve(requestResponse.sukses('Obat Sudah Di Delete'))
            }).catch(() => reject(requestResponse.serverError))
        })
    })