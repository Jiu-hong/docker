// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from '../../database/dbConnect'
import User from '../../database/models/user'
import formidable from 'formidable'
import fs from 'fs'
//import path from 'path'
export const config = {
    api: {
        externalResolver: true,
        bodyParser: false,
    },
}

export default async (req, res) => {
    let filearray = []
    // req.body = JSON.parse(req.body)
    const promisifyUpload = (req) =>
        new Promise((resolve, reject) => {
            const form = formidable({ multiples: true })

            form.parse(req, function (err, fields, files) {
                if (err) return reject(err)
                return resolve([fields, files])
            })
        })

    let [fields, files] = await promisifyUpload(req)

    const { name, email, comment } = fields

    files = Object.entries(files)
    console.log('files: ', files)

    var oldPath, newPath

    for (let i = 0; i < files.length; i++) {
        if (files[i][1].name) {
            oldPath = files[i][1].path
            newPath = 'public/images/' + files[i][1].name
            fs.copyFileSync(oldPath, newPath)
            fs.unlinkSync(oldPath)
            //  fs.renameSync(oldPath, newPath)

            newPath = '/' + newPath.split('/').slice(1).join('/')

            filearray.push(newPath) //file to db;
        }
    }

    console.log('filearray: ', filearray)

    await dbConnect()

    const user = new User({
        name: name,
        email: email,
        date: Date.now(),
        comment: comment,
        images: filearray,
    })
    const result = await user.save()

    res.send({ result })
}
