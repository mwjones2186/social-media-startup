const router = require('express').Router();

const {
    getSingleThought,
    getThoughts,
    createThought,
    createReaction,
    updateThought,
    deleteThought,
    deleteReaction,

} = require('../../controllers/thoughtControllers')

router.route('/').get(getThoughts).post(createThought)

router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought)

router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction)

module.exports = router;