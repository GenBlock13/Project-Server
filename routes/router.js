import { Router } from 'express'
import { router as userRouter } from './userRouter.js'
import { router as commentRouter } from './commentRouter.js'
import { router as fileRouter } from './fileRouter.js'
import { router as factRouter } from './factRouter.js'
import { router as placeRouter } from './placeRouter.js'

const router = new Router()

router.use('/auth', userRouter)
router.use('/comments', commentRouter)
router.use('/upload', fileRouter)
router.use('/facts', factRouter)
router.use('/places', placeRouter)

export { router }
