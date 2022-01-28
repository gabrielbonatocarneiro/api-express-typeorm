import Redis from "ioredis"
import { promisify } from "util"

const redisClient = new Redis(`redis://:@${ process.env.NODE_ENV === 'development' ? '127.0.0.1' : 'redisdb' }:6379`)

function getRedis(value: string) {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient)

  return syncRedisGet(value)
}

function setRedis(key: string, value: string) {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient)

  return syncRedisSet(key, value)
}

export { redisClient, getRedis, setRedis }
