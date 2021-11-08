module.exports.isAdmin = async (req, res, next) => {
    const { role } = req.user
    if (role !== 1) return res.status(400).json({ success: false, message: 'You isnot Admin' })
    next()
}