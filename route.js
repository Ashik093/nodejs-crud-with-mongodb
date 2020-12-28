const router = require('express').Router()
const { getAllContact, getSingleContact, createNewContact, updateContact, deleteContact } = require('./controller')

router.get('/', getAllContact);
router.get('/:id', getSingleContact)
router.post('/', createNewContact)
router.put('/:id', updateContact)
    // router.delete('/:id', deleteContact)
router.get('/delete/:id', deleteContact)

module.exports = router