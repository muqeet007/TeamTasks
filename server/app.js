import express from 'express'
import TeamRoutes from './routes/Team.route.js'
import UserRoutes from './routes/User.route.js'


export const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/teams',TeamRoutes)
app.use('/teams',UserRoutes)
