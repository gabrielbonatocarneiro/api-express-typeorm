import moment from "moment"
import momentTz from "moment-timezone"

export class MomentJS {
  now(): string {
    return momentTz.tz(moment.utc(moment()), "America/Sao_Paulo").format("YYYY-MM-DD HH:mm:ss")
  }
}
