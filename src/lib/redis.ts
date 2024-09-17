import { Redis } from '@upstash/redis'
import { Ratelimit } from "@upstash/ratelimit";
import '../../envConfig'

export const redis = new Redis({
  url: process.env.UPTASH_URL??'',
  token: process.env.UPTASH_TOKEN??'',
})


export const rateLimit = new Ratelimit({
    redis:redis,
    limiter:Ratelimit.slidingWindow(1,'10s')
})