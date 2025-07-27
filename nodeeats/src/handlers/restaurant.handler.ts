import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import { IRestaurant } from '@entities/restaurant.entity';
import { RestaurantService } from '@services/restaurant.service';

import { CreateRestaurantRequestDto } from '../dto/requests/createRestaurantRequest.dto';
import { UpdateRestaurantRequestDto } from '../dto/requests/updateRestaurantRequest.dto';
import { RestaurantResponseDto } from '../dto/responses/restaurantResponse.dto';
import { RestaurantFilter } from '../types/restaurantFilter.type';
import { handleRequest } from '../utils/handleRequest.util';
import { pagination } from '../utils/pagination.util';

@injectable()
export class RestaurantHandler {
  constructor(
    @inject(RestaurantService)
    private restaurantService: RestaurantService,
  ) {}

  public async create(req: Request, res: Response): Promise<Response> {
    return handleRequest(res, async () => {
      const createDto = new CreateRestaurantRequestDto(req.body);
      const restaurant = await this.restaurantService.create(createDto);
      return new RestaurantResponseDto(restaurant);
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    return handleRequest(res, async () => {
      const updateDto = new UpdateRestaurantRequestDto(req.body);
      const restaurant = await this.restaurantService.update(updateDto);
      if (!restaurant) throw new Error('Restaurant not found');

      return new RestaurantResponseDto(restaurant);
    });
  }

  public async getRestaurantByRestaurantNumber(
    req: Request,
    res: Response,
  ): Promise<Response> {
    return handleRequest(res, async () => {
      const restaurant =
        await this.restaurantService.getRestaurantByRestaurantNumber(
          req.params.restaurantNumber,
        );
      if (!restaurant) throw new Error('Restaurant not found');

      return new RestaurantResponseDto(restaurant);
    });
  }

  public async all(req: Request, res: Response): Promise<Response> {
    return handleRequest(res, async () => {
      const filter: RestaurantFilter = {
        restaurantNumber: req.query.restaurantNumber as string,
        name: req.query.name as string,
        email: req.query.email as string,
        status: req.query.status as 'opened' | 'closed' | 'pending',
        sortBy: req.query.sortBy as string,
        order: req.query.order as 'asc' | 'desc',
      };
      const { skip, limit } = pagination(req.query);
      const restaurants = this.restaurantService.all(filter, skip, limit);

      return (await restaurants).map(
        (restaurant: IRestaurant) => new RestaurantResponseDto(restaurant),
      );
    });
  }
}
