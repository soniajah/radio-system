var models = require('./../models')

exports.createProfile = (req, res) => {
    models.radio.findOne({ id: req.params.id })
        .then((result) => {
            if (result) {
                res.status(403).send("alias already exists")
            }
            else {
                var obj = { id: req.params.id, alias: req.body.alias, allowed_locations: req.body.allowed_locations }
                var newRadio = new models.radio(obj)
                newRadio.save()
                    .then(() => {
                        res.status(200).send()
                    })
                    .catch((err) => {
                        res.send(err)
                    })
            }

        })
        .catch((err) => {
            res.send(err)
        })
}

exports.saveLocation = (req, res) => {
    models.radio.findOne({ id: req.params.id })
        .then((radio) => {
            if (radio.allowed_locations.includes(req.body.location)) {
                radio.location = req.body.location
                radio.save()
                    .then(() => {
                        res.status(200).send()
                    })
                    .catch((err) => {
                        res.send(err)
                    })
            }
            else {
                res.status(403).send()
            }
        })
        .catch((err) => {
            res.send(err)
        })
}

exports.getLocation = (req, res) => {
    models.radio.findOne({ id: req.params.id })
        .then((radio) => {
            if (radio.location) {
                res.status(200).json({location: radio.location})
            }
            else {
                res.status(404).send()
            }
        })
        .catch((err) => {
            res.send(err)
        })
}