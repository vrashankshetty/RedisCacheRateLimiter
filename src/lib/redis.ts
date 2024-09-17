import { Redis } from '@upstash/redis'
import { Ratelimit } from "@upstash/ratelimit";
import { UPTASH_TOKEN,UPTASH_URL } from '../../env';

export const redis = new Redis({
  url: UPTASH_URL,
  token: UPTASH_TOKEN,
})


export const rateLimit = new Ratelimit({
    redis:redis,
    limiter:Ratelimit.slidingWindow(1,'10s')
})