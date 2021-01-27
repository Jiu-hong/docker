import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useRef } from 'react'

export default function Home() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [comment, setComment] = useState('')
    const [singlerec, setSinglerec] = useState('')
    const [allrec, setAllrec] = useState([])
    const formEL = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()

        const url = '/api/input'

        const formdata = new FormData(formEL.current)
        const option = {
            method: 'POST',
            body: formdata,
        }
        fetch(url, option)
            .then((result) => result.json())
            .then((result) => setSinglerec(JSON.stringify(result)))
            .catch((err) => console.log('err: ', err))
    }

    const handleGet = (e) => {
        e.preventDefault()
        const url = '/api/get'
        const option = {}
        fetch(url, option)
            .then((result) => result.json())
            .then((result) => setAllrec(result))
            .catch((err) => console.log(err))
    }
    const handleClear = (e) => {
        e.preventDefault()
        setSinglerec('')
        setAllrec('')
    }
    return (
        <div className="container">
            <form className="mt-3" ref={formEL}>
                <div className="form-group">
                    <input
                        name="name"
                        className="form-control rounded-0"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        name="email"
                        className="form-control rounded-0"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        name="comment"
                        className="form-control rounded-0"
                        placeholder="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="form-group">
                        <input
                            type="file"
                            className="form-control-file"
                            name="File1"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="file"
                            className="form-control-file"
                            name="File2"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="file"
                            className="form-control-file"
                            name="File3"
                        />
                    </div>
                    <button
                        className="btn btn-primary rounded-0 mr-3"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                    {singlerec && <div>{singlerec}</div>}
                    <button
                        className="btn btn-primary rounded-0 mr-3"
                        onClick={handleGet}
                    >
                        get
                    </button>
                    <button
                        className="btn btn-primary rounded-0"
                        onClick={handleClear}
                    >
                        clear
                    </button>
                    {allrec &&
                        allrec.map((rec, i) => (
                            <div key={i}>
                                <span className="mr-3">{rec.name}</span>
                                <span className="mr-3">{rec.email}</span>
                                <span className="mr-3">{rec.comment}</span>
                                {rec.images.map((imgurl, i) => (
                                    <img
                                        ley={i}
                                        src={imgurl}
                                        width={50}
                                        height={50}
                                        className="mr-3"
                                    />
                                ))}
                            </div>
                        ))}
                </div>
            </form>
        </div>
    )
}
