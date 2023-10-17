import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"



class HousesService {

  async getHouses() {
    const houses = await dbContext.Houses.find()
    return houses
  }

  async createHouse(houseData) {
    const house = await dbContext.Houses.create(houseData)
    return house
  }

  async getHouseById(houseId) {
    const house = await dbContext.Houses.findById(houseId)
    if (!house) {
      throw new BadRequest(`${houseId} is not a valid Id`)
    }
    return house
  }

  async destroyHouse(houseId, userId) {
    const houseToBeDestroyed = await this.getHouseById(houseId)
    if (houseToBeDestroyed.creatorId.toString() != userId) {
      throw new Forbidden("Not your house to destroy")
    }
    await houseToBeDestroyed.remove()
    return houseToBeDestroyed
  }

  async updateHouse(houseId, userId, houseData) {
    const houseToBeUpdated = await this.getHouseById(houseId)
    if (houseToBeUpdated.creatorId.toString() != userId) {
      throw new Forbidden("Not your house to update")
    }
    houseToBeUpdated.bedrooms = houseData.bedrooms || houseToBeUpdated.bedrooms
    houseToBeUpdated.bathrooms = houseData.bathrooms || houseToBeUpdated.bathrooms
    houseToBeUpdated.price = houseData.price != undefined ? houseData.price : houseToBeUpdated.price
    houseToBeUpdated.year = houseData.year || houseToBeUpdated.year
    houseToBeUpdated.imgUrl = houseData.imgUrl || houseToBeUpdated.imgUrl
    houseToBeUpdated.description = houseData.description || houseToBeUpdated.description
    await houseToBeUpdated.save()
    return houseToBeUpdated
  }
}

export const housesService = new HousesService()