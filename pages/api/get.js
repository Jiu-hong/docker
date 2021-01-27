import dbConnect from '../../database/dbConnect'
import User from '../../database/models/user'

export default async (req, res) => {
    await dbConnect()

    const result = await User.find()
    console.log('result: ', result)
    res.send(result)
}
