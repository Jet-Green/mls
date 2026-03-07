import type { BrandStatusType } from "./const/BrandStatus.type"

export interface IBrand {
  name: string,
  location: string,
  profileImage: string // image url
}

export interface IBrandDb extends IBrand {
  brandManagers: string[] // array of user ids
  status: BrandStatusType
  _id: string
}