const Contact = require('./Contact')

exports.getAllContact = (req, res) => {


    Contact.find()
        .then(contacts => {
            // res.json(contacts)
            res.render('index', { contacts, error: {} })
        })
        .catch(e => {
            res.json({
                message: e
            })
        })
}

exports.getSingleContact = (req, res) => {
    let { id } = req.params
    Contact.findById(id)
        .then(contact => {
            res.json(contact)
        })
        .catch(e => {
            res.json({
                message: e
            })
        })
}

exports.createNewContact = (req, res) => {
    let { name, email, phone, id } = req.body

    let error = {}
    if (!name) {
        error.name = "Please Enter A Name"
    }
    if (!email) {
        error.email = "Please Enter An Email"
    }
    if (!phone) {
        error.phone = "Please Enter A Phone"
    }

    let isError = Object.keys(error).length > 0

    if (isError) {
        Contact.find().then(contacts => {
            return res.render('index', { contacts, error })
        }).catch(e => {
            return res.json({
                message: "Error"
            })
        })
    }

    if (id) {
        Contact.findOneAndUpdate({ _id: id }, { $set: { name, phone, email } })
            .then(() => {
                Contact.find().then(contacts => {
                    return res.render('index', { contacts, error })
                }).catch(e => {
                    return res.json({
                        message: "Error"
                    })
                })
            })
            .catch(e => {
                return res.json({
                    message: "Error"
                })
            })
    } else {
        let contact = new Contact({
            name,
            email,
            phone
        })


        contact.save().then(c => {
            Contact.find().then(contacts => {
                return res.render('index', { contacts, error })
            }).catch(e => {
                return res.json({
                    message: 'Error'
                })
            })
        }).catch(e => {
            return res.json({
                message: "Error"
            })
        })
    }
}

exports.updateContact = (req, res) => {
    let { id } = req.params
    let { name, email, phone } = req.body

    Contact.findOneAndUpdate({ _id: id }, { name, email, phone }, { new: true })
        .then(contact => {
            res.json(contact)
        })
        .catch(e => {
            res.json({
                message: e
            })
        })

}

exports.deleteContact = (req, res) => {
    let { id } = req.params
    Contact.findOneAndDelete({ _id: id })
        .then(() => {
            Contact.find().then(contacts => {
                return res.render('index', { contacts, error: {} })
            }).catch(e => {
                return res.json({
                    message: 'Error'
                })
            })
        })
        .catch(e => {
            return res.json({
                message: e
            })
        })

}