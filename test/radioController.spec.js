const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');
const models = require('../src/models');

chai.use(chaiHttp)
var expect = chai.expect

function deleteProfile(id) {    
    return new Promise((resolve, reject) => {
        models.radio.deleteOne({ id: id })
        .then((result) => {
            resolve("deleted " + id)
        })
        .catch((err) => {
            reject("failed to delete " + id + " (: it's ok)")
        })        
    })    
} 

describe('Scenario for Radio Controller', function () {

    deleteProfile(-1).then(result =>{})

    it('should return created radio', function(done) {
        chai.request(server).post('/radios/-1').send({
            "alias": "Radio-2",
            "allowed_locations": [
                "CPH-1",
                "CPH-2"
            ]
            }).end((err, res) => {
                expect(res).to.have.status(200)
                done()
        })
    })

    it('should return created radio', function(done) {
        chai.request(server).post('/radios/-1').send({
            "alias": "Radio-1",
            "allowed_locations": [
                "CPH-1",
                "CPH-2"
            ]
            }).end((err, res) => {
                expect(res).to.have.status(403)
                done()
        })
    })

    it('should return 404 when getting location from -1 before it is set', function(done) {
        chai.request(server).get('/radios/-1/location').end((err, res) => {
                expect(res).to.have.status(404)
                done()
        })
    })

    it('should set location for radio -1', function(done) {
        chai.request(server).post('/radios/-1/location').send({
            "location": "CPH-1"
            }).end((err, res) => {
                expect(res).to.have.status(200)
                done()
        })
    })

    it('should return 403 when set location for radio -1', function(done) {
        chai.request(server).post('/radios/-1/location').send({
            "location": "CPH-9"
            }).end((err, res) => {
                expect(res).to.have.status(403)
                done()
        })
    })

    it('should get location for radio -1', function(done) {
        chai.request(server).get('/radios/-1/location').end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.deep.equal({location: "CPH-1"})
                done()
        })
    })

    it('should finalize test', function(done) {
        models.disconnect()
        done()
    })

})